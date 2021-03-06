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
					<Route path={'edit'} element={<AddUser/>}/>
				</Route>
				<Route path={'*'} element={<Navigate to={'/users/list'} replace />} />
			</Routes>
		</BrowserRouter>
	);
};