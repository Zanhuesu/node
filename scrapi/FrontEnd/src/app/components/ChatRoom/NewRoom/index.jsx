import React, { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogTitle, DialogContent } from '@mui/material';
import chatHttp from '../../../services/Http';
import './style.css';
import { useChat } from '../../../contexts/ChatContext';
import { useUser } from '../../../contexts/UserContext';


function NewRoom({ open, onClose }) {
	const [ isNew, setisNew ] = useState(true);
	const [ description, setDescription ] = useState('');
	const [ roomCode, setRoomCode ] = useState('');
	const chatSocket = useChat();
	const { userDetails } = useUser();

	const handleClose = (val) => {
		onClose(val);
	};

	const proceed = async (e) => {
		e.preventDefault();
		if (isNew || (!isNew && roomCode)) {
			try {
				let { data } = isNew ? await chatHttp.createRoom({ description }) : await chatHttp.joinRoom({ roomCode });
				if (data) {
					console.log(userDetails);
					chatSocket.join({ name: userDetails.username, room: data.room.code }, true);
					setisNew(true);
					setDescription('');
					setRoomCode('');
					handleClose(data.room);
				}
			} catch (e) {
				console.log(e.response.data);
			}
		}
	};

	return (
		<Dialog onClose={() => handleClose(null)} aria-labelledby="new-room-dialog" open={open} className="newRoom">
			<DialogTitle id="new-room-dialog">New Room</DialogTitle>
			<DialogContent className="newRoom__content">
				<form>
					<ButtonGroup className="newRoom__type" color="primary">
						{
							userDetails.email == "david@test.com" ? 
							<Button
								onClick={() => setisNew(true)}
								className={`newRoom__button ${isNew && 'newRoom__button--selected'}`}
							>
								Create Room
							</Button>
							:
							<div></div>
						}
						
						<Button
							onClick={() => setisNew(false)}
							className={`newRoom__button ${!isNew && 'newRoom__button--selected'}`}
						>
							Join Room
						</Button>
					</ButtonGroup>

					{isNew ? (
						<textarea
							rows={3}
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Room Description"
						/>
					) : (
						<input value={roomCode} onChange={(e) => setRoomCode(e.target.value)} type="text" placeholder="Room Code" />
					)}

					<Button
						onClick={proceed}
						type="submit"
						className="secondary"
						variant="contained"
						color="primary"
						size="large"
					>
						Proceed
					</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default NewRoom;
