import { NavigationInstruction, Next } from 'aurelia-router';

// Scrolls to top of summary page after it renders
export class RouteScrollPage {
	public run(instruction: NavigationInstruction, next: Next) {
		if (instruction.config.settings && instruction.config.settings.scrollToTop) {
			$('body').animate({ scrollTop: top }, 0);
		}

		return next();
	}
}
