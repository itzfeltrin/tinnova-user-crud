import {useUserContext} from '../../hooks/useUserContext';
import {User} from '../../components/User';
import {Link} from 'react-router-dom';

export const UserList = () => {
	const {users} = useUserContext();

	return (
		<main className={'page'}>
			<h1>Lista de usuários</h1>
			<Link to={'/users/new'} >Adicionar novo usuário</Link>
			<ul className={'user-list'}>
				{users.map(user => (
					<li key={user.email}>
						<User user={user}/>
					</li>
				))}
			</ul>
		</main>
	);
};