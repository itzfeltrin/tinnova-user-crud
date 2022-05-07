import {UserData} from '../types/user';
import {formatCpf, formatPhone} from '../helpers';
import Popup from 'reactjs-popup';
import {useUserContext} from '../context/User.context';
import {useCallback} from 'react';

type UserProps = {
	user: UserData;
}

export const User = ({user}: UserProps) => {
	const {removeUser} = useUserContext();

	const onRemove = useCallback(() => {
		removeUser(user.email);
	}, [removeUser, user.email]);

	return (
		<div className={'user'}>
			<Popup
				position="bottom right"
				className={'user-actions'}
				trigger={
					<button className={'menu'}>
						<span className={'dot'}/>
						<span className={'dot'}/>
						<span className={'dot'}/>
					</button>
				}
			>
				<div className={'actions'}>
					<button className={'edit'}>Editar</button>
					<button onClick={onRemove} className={'remove'}>Remover</button>
				</div>
			</Popup>
			<h2 className={'name'}>{user.name}</h2>
			<h3 className={'email'}>{user.email}</h3>
			<p>&#10022; <strong>CPF:</strong> {formatCpf(user.cpf)}</p>
			<p>&#10022; <strong>Telefone:</strong> {formatPhone(user.phone)}</p>
		</div>
	);
};