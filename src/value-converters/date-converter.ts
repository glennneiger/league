import * as moment from 'moment'

export class DateConverterValueConverter {
    toView(value) {
		return moment(value).format('M/D/YYYY');
    }
}
