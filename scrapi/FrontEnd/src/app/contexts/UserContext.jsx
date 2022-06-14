import { createContext, useContext } from 'react';
import { USER_INITIAL_VALUE } from '../constants';


export const UserContext = createContext({
	userDetails: USER_INITIAL_VALUE,
	setUserDetails: () => {}
});
export const useUser = () => useContext(UserContext);
