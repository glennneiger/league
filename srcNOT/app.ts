import {inject} from 'aurelia-framework';
import { autoinject } from 'aurelia-framework';
/**
 * RadReport 2.0
 *
 * @author Michael Crabtree
 * @author Derrick Lottich
 */
import { Router, RouterConfiguration } from 'aurelia-router';
import { PLATFORM } from 'aurelia-pal';
import { Configuration } from './config';
import { RouteScrollPage } from './utils/route-scroll-page';
import {EventAggregator} from 'aurelia-event-aggregator';
import { localStorageMiddleware, rehydrateFromLocalStorage, connectTo, MiddlewarePlacement, dispatchify } from 'aurelia-store';
import store from './store/store';

@autoinject
@connectTo()
export class App {
	constructor(){
		//register actions for local storage middleware
		store.registerAction('Rehydrate', rehydrateFromLocalStorage);
		store.registerMiddleware(localStorageMiddleware, MiddlewarePlacement.After, { key: 'store' });
		//get data in local storage and put it in state
		store.dispatch(rehydrateFromLocalStorage, 'store');
	}

	private async configureRouter(config: RouterConfiguration, router: Router) {
		config.title = Configuration.getApplicationName();
		config.options.pushState = true;
		config.options.root = '/';
		config.addPostRenderStep(RouteScrollPage);
		config.map([
			{
				route: 'home',
				//Hotloading 
				moduleId: PLATFORM.moduleName('./components/home/home', 'home'),
				title: 'Home',
				name: 'home',
				settings: {
					scrollToTop: false,
				},
			},
			{
				route: 'league',
				//Hotloading 
				moduleId: PLATFORM.moduleName('./components/create-league/create-league', 'home'),
				title: 'league',
				name: 'league',
				settings: {
					scrollToTop: false,
				},
			}
		]);
		config.mapUnknownRoutes(PLATFORM.moduleName('./components/home/home'));
	}
}
