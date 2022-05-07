import {useCallback, useEffect, useRef, useState} from 'react';
import {Router} from './router';
import {UserData} from './types/user';
import {useUserContext} from './context/User.context';

function App() {
	const {setUsers} = useUserContext();

	const firstMounted = useRef(true);

	const fetchData = useCallback(async () => {
		const savedUsers = localStorage.getItem("tinnova.users");
		if (!!savedUsers) {
			setUsers(JSON.parse(savedUsers));
			return;
		};

		fetch("https://private-9d65b3-tinnova.apiary-mock.com/users")
			.then(res => res.json())
			.then((data: Array<UserData>) => {
				setUsers(data);
				localStorage.setItem("tinnova.users", JSON.stringify(data));
			})
	}, [setUsers]);

	useEffect(() => {
		if (firstMounted.current) {
			fetchData();
			firstMounted.current = false;
		}
	}, [fetchData]);

	return <Router/>;
}

export default App;
