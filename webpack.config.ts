// tslint:disable-next-line:no-var-requires
const path = require('path');
// tslint:disable-next-line:no-var-requires
const glob = require('glob-all');
// tslint:disable-next-line:no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// tslint:disable-next-line:no-var-requires
const CopyWebpackPlugin = require('copy-webpack-plugin');
// tslint:disable-next-line:no-var-requires
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// tslint:disable-next-line:no-var-requires
const { AureliaPlugin } = require('aurelia-webpack-plugin');
// tslint:disable-next-line:no-var-requires
const { optimize, ProvidePlugin, DefinePlugin } = require('webpack');
// tslint:disable-next-line:no-var-requires
const { TsConfigPathsPlugin, CheckerPlugin } = require('awesome-typescript-loader');
// tslint:disable-next-line:no-var-requires
const CompressionPlugin = require('compression-webpack-plugin');
// tslint:disable-next-line:no-var-requires
const PurifyCSSPlugin = require('purifycss-webpack');
const TITLE = 'Draft';

// config helpers:
const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || [];
const when = (condition, config, negativeConfig?) =>
	condition ? ensureArray(config) : ensureArray(negativeConfig);

// primary config:
const title = 'Draft';
const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
	{ loader: 'css-loader' },
	{
		loader: 'postcss-loader',
		options: { plugins: () => [require('autoprefixer')({ browsers: ['last 3 versions'] })] },
	},
];
const scssRules =
	[
		{
			loader: 'css-loader?sourceMap',
		},
		{
			loader: 'sass-loader?sourceMap',
			options: {
				includePaths: [
					path.resolve('./node_modules/bootstrap-sass/assets/stylesheets'),
				],
			},
		},
	];
module.exports = (options: any = {}) => {
	const production = options.production;
	const extractCss = options.extractCss;
	const coverage = options.coverage;
	const server = options.server;
	return {
		resolve: {
			extensions: ['.ts', '.js'],
			modules: [srcDir, 'node_modules'],
		},
		entry: {
			app: ['aurelia-bootstrapper'],
			vendor: ['whatwg-fetch', 'babel-polyfill', 'bluebird', 'jquery'],
		},
		output: {
			path: outDir,
			publicPath: baseUrl,
			filename: production ? '[name].[chunkhash].bundle.js' : '[name].[hash].bundle.js',
			sourceMapFilename: production ? '[name].[chunkhash].bundle.map' : '[name].[hash].bundle.map',
			chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[name].[hash].chunk.js',
		},
		devServer: {
			https: false,
			host: '0.0.0.0',
			historyApiFallback: true,
			disableHostCheck: true,
			port: 9090,
			contentBase: outDir,
		},
		module: {
			rules: [
				// CSS required in JS/TS files should use the style-loader that auto-injects it into the website
				// only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
				{
					test: /\.css$/i,
					issuer: [{ not: [{ test: /\.html$/i }] }],
					use: extractCss ? ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: cssRules,
					}) : ['style-loader', ...cssRules],
				},
				{
					test: /\.scss$/,
					use: extractCss ? ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: scssRules,
					}) : ['style-loader', ...scssRules],
				},
				{
					test: /\.css$/i,
					issuer: [{ test: /\.html$/i }],
					// CSS required in templates cannot be extracted safely
					// because Aurelia would try to require it again in runtime
					use: cssRules,
				},
				{ test: /\.html$/i, loader: 'html-loader' },
				{ test: /\.ts$/i, loader: 'awesome-typescript-loader', exclude: nodeModulesDir },
				{ test: /\.json$/i, loader: 'json-loader' },
				// use Bluebird as the global Promise implementation:
				{ test: /[\/\\]node_modules[\/\\]bluebird[\/\\].+\.js$/, loader: 'expose-loader?Promise' },
				// exposes jQuery globally as $ and as jQuery:
				{ test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
				// embed small images and fonts as Data Urls and larger ones as files:
				{ test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
				{ test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
				{ test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
				// load these fonts normally, as files:
				{ test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
				...when(coverage, {
					test: /\.[jt]s$/i, loader: 'istanbul-instrumenter-loader',
					include: srcDir, exclude: [/\.{spec,test}\.[jt]s$/i],
					enforce: 'post', options: { esModules: true },
				}),
			],
		},
		plugins: [
			new AureliaPlugin({ features: { svg: false, ie: true, polyfills: 'none' } }),
			new ProvidePlugin({
				'Promise': 'bluebird',
				'$': 'jquery',
				'jQuery': 'jquery',
				'window.jQuery': 'jquery',
				Popper: ['popper.js', 'default']
			}),
			new TsConfigPathsPlugin(),
			new CheckerPlugin(),
			new HtmlWebpackPlugin({
				template: 'index.ejs',
				minify: production ? {
					removeComments: true,
					collapseWhitespace: true,
				} : undefined,
				metadata: {
					// available in index.ejs //
					title, server, baseUrl,
				},
			}),
			new CopyWebpackPlugin([
				{ from: 'static', to: '.' },
			]),
			new CopyWebpackPlugin([
				{ from: 'images', to: 'images' },
			]),
			...when(extractCss, new ExtractTextPlugin({
				filename: production ? '[contenthash].css' : '[id].css',
				allChunks: true,
			})),
			...when(production, new optimize.CommonsChunkPlugin({
				name: 'common',
			})),
			...when(production,
				new CompressionPlugin({
					asset: '[path].gz[query]',
					algorithm: 'gzip',
					test: /\.(js|html|css)$/,
					threshold: 10240,
					minRatio: 0.8,
				}),
			),
			new DefinePlugin({
				WEBPACK_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
			}),
			new PurifyCSSPlugin({
				// Give paths to parse for rules. These should be absolute!
				paths: glob.sync([
					path.join(__dirname, 'src/**/*.html'),
					path.join(__dirname, '*.ejs'),
					path.join(__dirname, 'node_modules/bootstrap/js/dropdown.js'),
					path.join(__dirname, 'node_modules/bootstrap/js/collapse.js'),
					path.join(__dirname, 'node_modules/bootstrap/js/button.js'),
					path.join(__dirname, 'node_modules/canvasjs/dist/canvasjs.min.js'),
				]),
				minimize: true,
			}),
		],
	};
};
