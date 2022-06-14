import React, { useState } from 'react';
import { parseISO } from 'date-fns';
import './style.css';
import {
    Grid,
    TextField,
    Card,
    MenuItem,
    Select,
    Switch,
    Button,
    Icon
} from '@mui/material'

function ChatHeader({ roomCode, messages, formatDate, toggleSafeMode }) {
	const [safeMode, setSafeMode] = useState(false);
	const handleSafe = () => {
		toggleSafeMode(!safeMode);
		setSafeMode(!safeMode);        
    }
	return (
		<div className="chat__header">
			<div className="chat__headerInfo">
				<h3>{safeMode == true ? '': 'Room'} {roomCode}</h3>
				{ safeMode != true? 
					<p>
						{messages.length > 0 ? (
							'Last activity ' + formatDate(parseISO(messages[messages.length - 1].createdAt))
						) : (
							'No recent activities...'
						)}
					</p>
					:
					<div></div>
				}
				
			</div>
			<div className="chat__headerIcons">
				<Switch
					checked={safeMode}
					onChange={handleSafe}
					value="safeMode"
					inputProps={{ 'aria-label': 'secondary checkbox' }}
				/>
				{/* TODO future implementation */}
				{/* <IconButton>
						<SearchIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton> */}
			</div>
		</div>
	);
}

export default ChatHeader;
