import * as _ from 'underscore';

export class Utils {

	// returns list of list groups by n
	public static partition(items, n: number) {
		const result = _.groupBy(items, (item, i) => {
			return Math.floor(i % n);
		});

		return _.values(result);
	}

	public isIOS() {
		return (navigator.userAgent.match('FxiOS') || navigator.userAgent.match('CriOS') || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i));
	}

	public iOSDownloadPreview(path, data) {
		const form = document.createElement('form');
		form.setAttribute('method', 'post');
		form.setAttribute('action', path);
		form.setAttribute('id', 'preview-form');

		for (const key in data) {
			if (data.hasOwnProperty(key)) {
				const hiddenField = document.createElement('input');
				hiddenField.setAttribute('type', 'hidden');
				hiddenField.setAttribute('name', key);
				hiddenField.setAttribute('value', data[key]);

				form.appendChild(hiddenField);
			}
		}

		document.body.appendChild(form);
		form.submit();
	}

	public deleteCookie(name){
		document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}
