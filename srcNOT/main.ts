/// <reference types="aurelia-loader-webpack/src/webpack-hot-interface"/>
//import 'bootstrap/js/transition';
//import 'bootstrap/js/dropdown';
//import 'bootstrap/js/button';
//import 'bootstrap/js/collapse';
//import 'requestanimationframe';

import { Aurelia } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';
import * as Bluebird from 'bluebird';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './app.css';
import { initialState } from './store/state';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: false });

export async function configure(aurelia: Aurelia) {
	aurelia.use
		.standardConfiguration()
		.developmentLogging()
		.feature(PLATFORM.moduleName('components/index'))
		.plugin(PLATFORM.moduleName('aurelia-dialog'))
		.plugin(PLATFORM.moduleName('au-table'))
		.plugin(PLATFORM.moduleName('aurelia-store'), { initialState });
	await aurelia.start();
	await aurelia.setRoot(PLATFORM.moduleName('app'));
}
