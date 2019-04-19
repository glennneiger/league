import {Cookies} from 'aurelia-plugins-cookies';

declare var WEBPACK_ENV;

export class Configuration {
	public home: boolean = true;
	// Init for production
	protected static appName = 'Draft';

	protected static appURI = 'https://draft.com';

	protected static baseURI = 'http://leagues-env.ubej5bd3iy.us-east-1.elasticbeanstalk.com/';

	protected static basePath = 'league/v1';

	public static getApplicationName() {
		return Configuration.appName;
	}

	public static getBaseURI(basepath='api/') {
		console.log(WEBPACK_ENV);
		if (WEBPACK_ENV === 'dev' || WEBPACK_ENV === 'local') {
			Configuration.baseURI = 'http://lara.test/';
		} else if (WEBPACK_ENV === 'stage') {
			Configuration.baseURI = 'http://leagues-env.ubej5bd3iy.us-east-1.elasticbeanstalk.com/';
		}

		return Configuration.baseURI + basepath;
	}
}