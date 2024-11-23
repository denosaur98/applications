export function phoneMask(event) {
	let value = event.target.value.replace(/\D/g, '')
	if (value.length > 11) {
		value = value.slice(0, 11)
	}
	if (value.length > 0 && value[0] !== '7') {
		value = '7' + value
	}
	if (value.length > 1 && value[1] !== '9') {
		value = value[0] + '9' + value.slice(1)
	}
	this.username = value
}
