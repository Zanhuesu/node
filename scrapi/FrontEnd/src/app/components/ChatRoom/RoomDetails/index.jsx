import React, { useState } from 'react';
import './style.css';
import { Avatar, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@mui/material';
import ConfirmationDialog from '../ConfirmationDialog';
import chatHttp from '../../../services/Http';
import { useUser } from '../../../contexts/UserContext';
import PhotoIcon from '@mui/icons-material/Photo';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';


function RoomDetails({ roomDetails, onRoomLeave }) {
	const { code, description, users } = roomDetails;
	const [ isOpen, setIsOpen ] = useState(false);
	const [ content, setContent ] = useState('');
	const [ type, setType ] = useState('Leave');
	const { userDetails } = useUser();

	const openDialog = (type) => {
		setIsOpen(true);
		setType(type);
		if (type === 'Leave') {
			setContent(
				'You will not be able to receive messeges sent in this room anymore. Other users in the room will also be notified when you leave.'
			);
		} else {
			setContent('You will not be able to revert this deletion.');
		}
	};

	const handleModalClose = async (willProceed) => {
		try {
			setIsOpen(false);
			if (willProceed) {
				if (type === 'Leave') {
					await chatHttp.leaveRoom({ roomCode: code });
					onRoomLeave(code);
				} else {
					await chatHttp.deleteRoom({ roomCode: code });
				}
			}
		} catch (e) {
			console.log(e.response.data);
		}
	};

	const generateOptions = () => {
		const ROOM_OPTIONS = [
			{ label: 'Change Group Photo', icon: <PhotoIcon />, adminOnly: false },
			{ label: 'Leave Group', icon: <MeetingRoomIcon />, adminOnly: false, action: () => openDialog('Leave') },
			{ label: 'Delete Group', icon: <DeleteIcon />, adminOnly: true, action: () => openDialog('Delete') }
		];
		return ROOM_OPTIONS.map(({ label, icon, adminOnly, action }, i) => {
			console.log(label, i);
			return (
				(!adminOnly || (adminOnly && users[0].user.username === userDetails.username)) && (
					<ListItem key={i} button onClick={action}>
						<ListItemIcon>{icon}</ListItemIcon>
						<ListItemText primary={label} />
					</ListItem>
				)
			);
		});
	};

	const generateUserList = () => {
		return users.map(({ user }) => {
			const { username, firstName, lastName } = user;
			return (
				<ListItem key={username}>
					<ListItemAvatar>
						<Avatar>{firstName && lastName ? firstName.charAt(0) + lastName.charAt(0) : <PersonIcon />}</Avatar>
					</ListItemAvatar>
					<ListItemText primary={`${firstName} ${lastName}`} secondary={username} />
				</ListItem>
			);
		});
	};

	return (
		<div className="room__details">
			<Avatar className="avatar--large">
				<GroupIcon />
			</Avatar>
			<h1>{code}</h1>
			<p>{description}</p>
			<List>{generateOptions()}</List>
			<List>{generateUserList()}</List>

			<ConfirmationDialog open={isOpen} onClose={handleModalClose} content={content} />
		</div>
	);
}

export default RoomDetails;
