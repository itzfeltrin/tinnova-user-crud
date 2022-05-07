import React, {createContext, useCallback, useContext, useState} from 'react';
import {UserData} from '../types/user';

type UserContextData = {
	users: Array<UserData>;
	setUsers: React.Dispatch<React.SetStateAction<Array<UserData>>>;
	addUser(newUser: UserData): void;
}

const UserContext = createContext<UserContextData>({
	users: [],
	setUsers() {},
	addUser() {},
});

const UserContextProvider = (props: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<Array<UserData>>([]);

	const addUser = useCallback((newUser: UserData) => {
		const savedUsers = JSON.parse(localStorage.getItem('tinnova.users') || "[]");

		const newUserFormatted = {
			...newUser,
			cpf: newUser.cpf.replace(/\D/g, ''),
			phone: newUser.phone.replace(/\D/g, '')
		};

		savedUsers.push(newUserFormatted);

		localStorage.setItem('tinnova.users', JSON.stringify(savedUsers));
		setUsers(savedUsers);
	}, [setUsers]);

	return (
		<UserContext.Provider value={{users, setUsers, addUser}}>
			{props.children}
		</UserContext.Provider>
	);
};

const useUserContext = () => useContext(UserContext);

export {
	UserContextProvider,
	useUserContext,
}