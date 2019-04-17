import { autoinject } from 'aurelia-framework';
// node_modules
import { FrameworkConfiguration } from 'aurelia-framework';
import { PLATFORM } from 'aurelia-pal';

export function configure(config: FrameworkConfiguration) {
    config.globalResources([
		  PLATFORM.moduleName('./home/home'),
		  PLATFORM.moduleName('./game/game'),
		  PLATFORM.moduleName('./create-league/create-league'),
	]);
}
