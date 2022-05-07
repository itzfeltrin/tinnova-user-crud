import {UserData} from '../types/user';
import {formatCpf, formatPhone} from '../helpers';

type UserProps = {
	user: UserData;
}

export const User = ({user}: UserProps) => {
	return (
		<div className={'user'}>
			<h2 className={'name'}>{user.name}</h2>
			<h3 className={'email'}>{user.email}</h3>
			<p>&#10022; <strong>CPF:</strong> {formatCpf(user.cpf)}</p>
			<p>&#10022; <strong>Telefone:</strong> {formatPhone(user.phone)}</p>
		</div>
	);
};