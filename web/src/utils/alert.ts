export function onCloseAlert(setAlert: ({}) => void) {
	setAlert({
		type: '',
		text: '',
		show: false,
	});
}

export function onShowAlert(setAlert: ({}) => void, type: string) {
	setAlert({
		type: type,
		text: 'Demo alert',
		show: true,
	});
}
