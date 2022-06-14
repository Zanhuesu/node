import { IconButton } from '@mui/material';
import React, { useState } from 'react';
import { useChat } from '../../../contexts/ChatContext';
import SendIcon from '@mui/icons-material/Send';
import './style.css';

function ChatFooter({ roomCode, loggedInUser, safeMode }) {
	const [ input, setInput ] = useState('');
	const chatSocket = useChat();
	const sendMessage = async (e) => {
		e.preventDefault();
		if (input) {
			const messageDetails = {
				userRoom: {
					name: loggedInUser.username,
					room: roomCode
				},
				content: input
			};
			setInput('');

			console.log('sending message: ' + JSON.stringify(messageDetails));
			chatSocket.send(messageDetails);
		}
	};
	return (
		<div className="chat__footer">
			{
				safeMode == true ?
				<div>
					<form>
						<input value={input} onChange={(e) => setInput(e.target.value)} type="text" style={{border: '0px'}}/>
						<button onClick={sendMessage} type="submit" style={{display: 'none'}}>
							Send
						</button>
					</form>
				</div>:
				<form>
					<input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="Start typing.." />
					<button onClick={sendMessage} type="submit">
						Send
					</button>
				</form>
			}

			{
				safeMode == true ?
				<div>
				
				</div>:
				<IconButton onClick={sendMessage}>
					<SendIcon />
				</IconButton>
			}
			
			
		</div>
	);
}

export default ChatFooter;
