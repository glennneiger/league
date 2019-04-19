import {Cookies} from 'aurelia-plugins-cookies';

declare var WEBPACK_ENV;

export class Configuration {
	public home: boolean = true;
	// Init for production
	protected static appName = 'RadReport';

	protected static appURI = 'https://portfolio.rsna.org';

	protected static baseURI = 'https://phpapi.rsna.org';

	protected static basePath = 'radreport/v1';

	protected static updateProfileLink = 'https://www2.rsna.org/timssnet/demographics/tnt_cusupdate.cfm';

	protected static loginLink = 'https://www2.rsna.org/timssnet/login/caslogin.cfm?referrer_path=' + Configuration.getAppURI();

	protected static logoutLink = 'https://www2.rsna.org/timssnet/reset.cfm';

	public static getApplicationName() {
		return Configuration.appName;
	}

	public static getAppURI() {
		if (WEBPACK_ENV === 'dev' || WEBPACK_ENV === 'local') {
			Configuration.appURI = 'https://radreportdev.rsna.org';
		} else if (WEBPACK_ENV === 'stage') {
			Configuration.appURI = 'https://radreportstage.rsna.org';
		}

		return Configuration.appURI;
	}

	public static getBaseURI(basepath='radreport/v1') {
		if (WEBPACK_ENV === 'dev' || WEBPACK_ENV === 'local') {
			Configuration.baseURI = 'https://phpapidev.rsna.org';
		} else if (WEBPACK_ENV === 'stage') {
			Configuration.baseURI = 'https://phpapistage.rsna.org';
		}

		return Configuration.baseURI + '/' + basepath;
	}

	public static getSingleSignOn() {
		const sso = Cookies.get('SSO');

		// Only encode if sso is present. Otherwise
		// will return null, which evals to both true
		// and false (it's undefined, actually).
		if (!!sso) {
			return encodeURIComponent(Cookies.get('SSO'));
		} else {
			return sso;
		}
	}

	public static getHttp(http) {
		// encodeURI header value see https://www.owasp.org/index.php/Injection_Theory
		return http.configure((config) => {
			config
				.useStandardConfiguration()
				.withBaseUrl(Configuration.getBaseURI())
				.withDefaults({
					headers: {
						SSO: Configuration.getSingleSignOn(), // 'uW%2Bxdh3SDsHvOxcW%2BU1oVA%3D%3D',
					},
				});
		});
	}
}
