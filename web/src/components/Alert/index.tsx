import Alert from 'react-popup-alert';

interface AlertProps {
	alert: {
		type: string;
		text: string;
		show: boolean;
	};
	onCloseAlert: () => void;
}

export function AlertCard({ alert, onCloseAlert }: AlertProps) {
	return (
		<Alert
			btnText={'Ok'}
			text={alert.text}
			type={alert.type}
			show={alert.show}
			onClosePress={onCloseAlert}
			pressCloseOnOutsideClick={true}
			showBorderBottom={true}
			alertStyles={{
				width: '100%',
				backgroundColor: '#1E1F24',
				borderRadius: 12,
				padding: 20,
			}}
			textStyles={{ marginBottom: 16, color: 'white' }}
			headerStyles={{ display: 'none' }}
			buttonStyles={{
				backgroundColor:
					alert.type === 'success' ? 'rgb(40, 167, 69)' : 'rgb(220, 53, 69)',
				paddingLeft: 16,
				paddingRight: 16,
				paddingTop: 6,
				paddingBottom: 6,
				color: 'white',
				borderRadius: 6,
			}}
		/>
	);
}
