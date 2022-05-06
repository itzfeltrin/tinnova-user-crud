import {useCallback, useEffect, useState} from 'react';
import {UserData} from '../../types/user';

const mockData = [
	{
		'name': 'Joao da Silva',
		'cpf': '26899337649',
		'phone': '4233335555',
		'email': 'joao@joaosilva.com.br'
	},
	{
		'name': 'Maria Antonieta',
		'cpf': '65138896180',
		'phone': '1255553333',
		'email': 'maria@mariaantonieta.com.br'
	},
	{
		'name': 'Luiz Souza',
		'cpf': '32420496329',
		'phone': '1144446666',
		'email': 'luiz@luizsouza.com.br'
	}
];

export const UserList = () => {
	const [users, setUsers] = useState<Array<UserData>>([]);

	const fetchData = useCallback(async () => {
		const data: Array<UserData> = await new Promise((resolve) => {
			setTimeout(() => {
				resolve(mockData);
			}, 2500);
		});

		setUsers(data);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<ul>
			{users.map(user => (
				<li key={user.email}>
					{user.name}
				</li>
			))}
		</ul>
	);
};