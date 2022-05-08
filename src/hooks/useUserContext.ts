import {useContext} from 'react';
import {UserContext} from '../context/User.context';

export const useUserContext = () => useContext(UserContext)