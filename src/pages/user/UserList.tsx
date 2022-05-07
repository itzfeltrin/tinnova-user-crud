import {useUserContext} from '../../context/User.context';
import {User} from '../../components/User';

export const UserList = () => {
	const {users} = useUserContext();

	return (
		<main className={'page'}>
			<h1>Lista de usuários</h1>
			<ul>
				{users.map(user => (
					<li key={user.email}>
						<User user={user}/>
					</li>
				))}
			</ul>
		</main>
	);
};