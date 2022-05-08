import {UserData} from '../../types/user';
import {formatCpf, formatPhone} from '../../helpers';
import Popup from 'reactjs-popup';
import {useUserContext} from '../../hooks/useUserContext';
import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

type UserProps = {
	user: UserData;
}

export const User = ({user}: UserProps) => {
	const {removeUser} = useUserContext();

	const navigate = useNavigate();

	const onEdit = useCallback(() => {
		navigate(`/users/edit?user=${JSON.stringify(user)}`);
	}, [navigate, user]);

	const onRemove = useCallback(() => {
		removeUser(user.email);
	}, [removeUser, user.email]);

	return (
		<div className={'user'} data-testid={'user'}>
			<Popup
				position="bottom right"
				className={'user-actions'}
				trigger={
					<button className={'menu'} data-testid={'menu'}>
						<span className={'dot'}/>
						<span className={'dot'}/>
						<span className={'dot'}/>
					</button>
				}
			>
				<div className={'actions'}>
					<button onClick={onEdit} className={'edit'}>Editar</button>
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