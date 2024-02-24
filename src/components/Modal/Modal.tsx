import {IonHeader, IonIcon, IonModal, IonTitle} from '@ionic/react'
import {closeOutline} from 'ionicons/icons'
import React from 'react'
import './Modal.scss'

type ModalProps = React.PropsWithChildren<{
	isOpen: boolean;
	title: string;
	onClose: () => void;
}>

export const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children}) => (
	<IonModal isOpen={isOpen} onDidDismiss={onClose} className='modal'>
		<IonHeader className='modal__header'>
			<IonTitle className='modal__header__title'>{title}</IonTitle>
			<IonIcon
				className='modal__header__closeButton'
				onClick={() => {
					onClose()
				}}
				color='white'
				size='large'
				icon={closeOutline}
			/>
		</IonHeader>
		<div className='modal__content'>
			{children}
		</div>
	</IonModal>
)
