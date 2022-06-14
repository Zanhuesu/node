import { Avatar } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import Scrollbar from 'react-scrollbars-custom';
// import Scrollbar from 'react-perfect-scrollbar';
import './style.css';
import chatHttp from '../../../services/Http';
import { parseISO, differenceInCalendarDays, format, formatDistanceToNow } from 'date-fns';
import PersonIcon from '@mui/icons-material/Person';
import { useChat } from '../../../contexts/ChatContext';
import { useUser } from '../../../contexts/UserContext';
import ChatHeader from '../ChatHeader';
import ChatFooter from '../ChatFooter';



const Chat = ({ roomCode }) => {
	const [ messages, setMessages ] = useState([]);
	const chatSocket = useChat();
	const { userDetails } = useUser();
	const [safeMode, setSafeMode] = useState(false);
	const setRef = useCallback((node) => {
		if (node) {
			node.scrollIntoView({ smooth: true });
		}
	}, []);

	useEffect(
		() => {
			if (chatSocket === null) return;
			const subscription = chatSocket.onMessage().subscribe(({ newMsg, updatedRoom }) => {
				if (newMsg !== undefined && newMsg.roomCode === roomCode) {
					setMessages((prevMsgs) => [ ...prevMsgs, newMsg ]);
				}
			});
			return () => {
				subscription.unsubscribe();
			};
		},
		[ chatSocket, roomCode ]
	);

	useEffect(
		() => {
			chatHttp
				.getMessages({ roomCode })
				.then(({ data }) => {
					setMessages((prevMsgs) => data.messages);
				})
				.catch(({ response }) => {
					console.log(response.data);
				});
		},
		[ roomCode ]
	);

	const formatDate = (date) => {
		return differenceInCalendarDays(new Date(), date) > 2
			? format(date, 'EEE MMM d h:m b')
			: formatDistanceToNow(date, { addSuffix: true });
	};

	const toggleSafeMode = (safemode) => {
		console.log(safemode);
		setSafeMode(safemode);
	};

	return (
		<div className="chat">
			<ChatHeader roomCode={roomCode} messages={messages} formatDate={formatDate} toggleSafeMode={toggleSafeMode} />
			
				{
					safeMode == true ?
					<div className="chat__body" style={{maxHeight: '50px', background: 'white'}}>
						<Scrollbar className="chat__scrollbar">
							<div className="chat__main">
								{messages.map(({ content, user, createdAt }, i) => {
									const lastMessage = messages.length - 1 === i;
									return (
										<div
											
											key={i}
										>
											<div className="message__block">
												{/* <Avatar>
													{user.firstName && user.lastName ? (
														user.firstName.charAt(0) + user.lastName.charAt(0)
													) : (
														<PersonIcon />
													)}
												</Avatar> */}
												<p ref={lastMessage ? setRef : null} >
													<span className="header__text chat__person">
														{userDetails.username === user.username ? 'two challenges---> Loaded staked assets' : "Stacked Assets will be done in 2 seconds"}
													</span>
													{content}
												</p>
											</div>
											{/* <span className="chat__timestamp">{formatDate(parseISO(createdAt))}</span> */}
										</div>
									);
								})}
							</div>
						</Scrollbar> 
					</div>:
					<div className="chat__body">
						<Scrollbar className="chat__scrollbar">
							<div className="chat__main">
								{messages.map(({ content, user, createdAt }, i) => {
									const lastMessage = messages.length - 1 === i;
									return (
										<div
											className={`chat__block ${userDetails.username === user.username &&
												'chat__block--sender'} ${user.username === 'Chatbot' && 'chat__block--bot'}`}
											key={i}
										>
											<div className="message__block">
												<Avatar>
													{user.firstName && user.lastName ? (
														user.firstName.charAt(0) + user.lastName.charAt(0)
													) : (
														<PersonIcon />
													)}
												</Avatar>
												<p ref={lastMessage ? setRef : null} className="chat__message">
													<span className="header__text chat__person">
														{userDetails.username === user.username ? 'You' : user.username}
													</span>
													{content}
												</p>
											</div>
											<span className="chat__timestamp">{formatDate(parseISO(createdAt))}</span>
										</div>
									);
								})}
							</div>
						</Scrollbar>
					</div>
				}
			
			<ChatFooter roomCode={roomCode} loggedInUser={userDetails} safeMode={safeMode} />
		</div>
	);
};

export default Chat;
