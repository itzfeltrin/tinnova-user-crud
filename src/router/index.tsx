import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {AddUser} from '../pages/user/AddUser';
import {UserList} from '../pages/user/UserList';

export const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={'users'}>
					<Route path={'new'} element={<AddUser/>}/>
					<Route path={'list'} element={<UserList/>}/>
				</Route>
				<Route path={'*'} element={<Navigate to={'users/new'} replace />} />
			</Routes>
		</BrowserRouter>
	);
};