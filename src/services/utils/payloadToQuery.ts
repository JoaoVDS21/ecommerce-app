export default function payloadToQuery(payload: {}): string {
	if (Object.keys(payload).length === 0){
		return '';
	}
	const array = Object.entries(payload);
	const query = array.reduce((acc, [key, value], index) => acc+`${key}=${value}${index != array.length - 1 ? '&' : ''}`, '?');
	return query;
}
