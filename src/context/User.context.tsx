import React, {createContext, useContext, useState} from 'react';
import {UserData} from '../types/user';

type UserContextData = {
	users: Array<UserData>;
	setUsers: React.Dispatch<React.SetStateAction<Array<UserData>>>;
}

const UserContext = createContext<UserContextData>({
	users: [],
	setUsers() {}
});

const UserContextProvider = (props: { children: React.ReactNode }) => {
	const [users, setUsers] = useState<Array<UserData>>([]);

	return (
		<UserContext.Provider value={{users, setUsers}}>
			{props.children}
		</UserContext.Provider>
	);
};

const useUserContext = () => useContext(UserContext);

export {
	UserContextProvider,
	useUserContext,
}