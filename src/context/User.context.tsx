import React, {createContext, useCallback, useContext, useState} from 'react';
import {UserData} from '../types/user';

type UserContextData = {
	users: Array<UserData>;
	setUsers: React.Dispatch<React.SetStateAction<Array<UserData>>>;
	upsertUser(newUser: UserData, oldEmail?: string): void;
	removeUser(email: string): void;
}

const UserContext = createContext<UserContextData>({
	users: [],
	setUsers() {
	},
	upsertUser() {
	},
	removeUser() {
	},
});

const UserContextProvider = (props: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<Array<UserData>>([]);

	const upsertUser = useCallback((newUser: UserData, oldEmail?: string) => {
		const savedUsers = JSON.parse(localStorage.getItem('tinnova.users') || '[]');
		const newUserFormatted = {
			...newUser,
			cpf: newUser.cpf.replace(/\D/g, ''),
			phone: newUser.phone.replace(/\D/g, '')
		};
		if (oldEmail) {
			const index = savedUsers.findIndex((user: UserData) => user.email === oldEmail);
			savedUsers[index] = newUserFormatted;
		} else {
			savedUsers.push(newUserFormatted);
		}
		localStorage.setItem('tinnova.users', JSON.stringify(savedUsers));
		setUsers(savedUsers);
	}, [setUsers]);

	const removeUser = useCallback((email: string) => {
		const savedUsers = JSON.parse(localStorage.getItem('tinnova.users') || '[]');
		const newUsers = savedUsers.filter((user: UserData) => user.email !== email);
		setUsers(newUsers);
		localStorage.setItem('tinnova.users', JSON.stringify(newUsers));
	}, [setUsers]);

	return (
		<UserContext.Provider value={{users, setUsers, upsertUser, removeUser}}>
			{props.children}
		</UserContext.Provider>
	);
};

export {
	UserContext,
	UserContextProvider,
};