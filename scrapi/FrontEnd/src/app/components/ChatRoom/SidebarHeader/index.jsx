import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import { USER_INITIAL_VALUE } from '../../../constants';
import { useChat } from '../../../contexts/ChatContext';
import { useUser } from '../../../contexts/UserContext';
import chatHttp from '../../../services/Http';
import './style.css';
import { useHistory } from 'react-router-dom'; 


function SidebarHeader({ history, onNewRoom }) {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const { userDetails, setUserDetails } = useUser();
	const chatSocket = useChat();

	const onLogout = () => {
		setAnchorEl(null);
		console.log('Disconnecting Socket Context..');
		chatSocket.disconnect();
		chatHttp
			.changeLoginStatus({ newValue: false })
			.then((resp) => {
				localStorage.clear();
				setUserDetails(USER_INITIAL_VALUE);
				history.push('/login');
			})
			.catch(({ response }) => {
				console.log(response);
			});
	};
	return (
		<div className="sidebar__header">
			<div className="sidebar__headerAvatar">
				<Avatar>
					{userDetails.firstName && userDetails.lastName ? (
						userDetails.firstName.charAt(0) + userDetails.lastName.charAt(0)
					) : (
						<PersonIcon />
					)}
				</Avatar>
				<p className="header__text">{userDetails.firstName + ' ' + userDetails.lastName}</p>
			</div>
			<div className="sidebar__headerIcons">
				<IconButton onClick={onNewRoom}>
					<ChatIcon />
				</IconButton>
				<IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
					<MoreVertIcon />
				</IconButton>
				<Menu
					id="sidebar-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={() => setAnchorEl(null)}
				>
					<MenuItem onClick={onLogout}>Logout</MenuItem>
				</Menu>
			</div>
		</div>
	);
}

export default SidebarHeader;
