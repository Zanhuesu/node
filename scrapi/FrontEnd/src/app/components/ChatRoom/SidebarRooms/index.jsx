import { Avatar } from '@mui/material';
import React from 'react';
import GroupIcon from '@mui/icons-material/Group';
import './style.css';


const SidebarRoom = ({ room, userDetails, onRoomClick }) => {
	const userIndex = room.users.findIndex(
		(roomUser) => roomUser.user.username === userDetails.username
	);
	return (
		<div className="sidebarRoom" onClick={() => onRoomClick(room.code)}>
			<Avatar>
				<GroupIcon />
			</Avatar>
			{userIndex >= 0 && (
				<React.Fragment>
					<div
						className={`sidebarRoom__details ${room.users[userIndex].unread > 0 && 'sidebarRoom__details--unread'} `}
					>
						<h2>{room.code}</h2>
						<p>{room.lastMessagePreview || room.description}</p>
					</div>
					{room.users[userIndex].unread > 0 && (
						<div className="sidebarRoom__unread">
							<p>{room.users[userIndex].unread}</p>
						</div>
					)}
				</React.Fragment>
			)}
		</div>
	);
};

export default SidebarRoom;
