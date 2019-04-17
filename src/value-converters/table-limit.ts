export class TableLimitValueConverter {
    toView(array, pageNum, pageSize) {
		var start = (pageNum * pageSize) - pageSize;
		var end = (pageNum*pageSize);
        return array.slice(start, end);
    }
}
