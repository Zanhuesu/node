import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Chat from '../../components/ChatRoom/Chat';
import Sidebar from '../../components/ChatRoom/Sidebar';
import NewRoom from '../../components/ChatRoom/NewRoom';
import chatHttp from '../../services/Http';
import RoomDetails from '../../components/ChatRoom/RoomDetails';
import { useChat } from '../../contexts/ChatContext';
import GeneralSnackbar from '../../components/ChatRoom/GeneralSnackbar';
import messageAudio from '../../../assets/audio/message.mp3';
import { useUser } from '../../contexts/UserContext';
import { USER_INITIAL_VALUE } from '../../constants';
import { useHistory } from 'react-router-dom';



const audio = new Audio(messageAudio);

const Room = ({ history }) => {
	const { userDetails, setUserDetails } = useUser();
	const [ openModal, setOpenModal ] = useState(false);
	const [ openSnackbar, setOpenSnackbar ] = useState(false);
	const snackbarMsg = useRef('');
	const [ rooms, setRooms ] = useState([]);
	const [ roomCode, setRoomCode ] = useState('');
	const chatSocket = useChat();	
	const navigate = useNavigate()

	const updateUnread = useCallback(
		(room, willReset) => {
			const userIndex = room.users.findIndex(
				(roomUser) => roomUser.user.username === userDetails.username
			);
			room.users[userIndex].unread = willReset ? 0 : ++room.users[userIndex].unread;
			chatSocket.updateUnread(room.users[userIndex].unread, room.code, userDetails.username);
			return room;
		},
		[ chatSocket, userDetails.username ]
	);

	useEffect(
		() => {
			console.log('Initializing Socket Context..');
			chatSocket.init();
			chatHttp
				.getRooms()
				.then(({ data }) => {
					setRooms(() => {
						if (data.rooms[0]) data.rooms[0] = updateUnread(data.rooms[0], true);
						return data.rooms;
					});
					if (data.rooms[0]) {
						setRoomCode(data.rooms[0].code);
						data.rooms.forEach((room) => {
							chatSocket.join({ name: userDetails.username || '', room: room.code });
						});
					}
				})
				.catch(({ response }) => {
					if (response.status === 401) {
						localStorage.clear();
						setUserDetails(USER_INITIAL_VALUE);
						// history.push('/login');
						navigate('/session/signin')
					}
				});
		},
		[ history, chatSocket, userDetails.username, setUserDetails, updateUnread ]
	);

	useEffect(
		() => {
			if (chatSocket === null) return;
			const joinSubscription = chatSocket.onJoin().subscribe(({ userDetails, joinedRoom }) => {
				setRooms((prevRooms) => {
					const newRooms = [ ...prevRooms ];
					const roomIndex = newRooms.findIndex((room) => room.code === joinedRoom);
					if (roomIndex >= 0) newRooms[roomIndex].users.push({ user: userDetails, unread: 0 });
					return newRooms;
				});
			});
			const leaveSubscription = chatSocket.onLeave().subscribe(({ userDetails, leftRoom }) => {
				setRooms((prevRooms) => {
					const newRooms = [ ...prevRooms ];
					const roomIndex = newRooms.findIndex((room) => room.code === leftRoom);
					if (roomIndex >= 0) {
						newRooms[roomIndex].users = newRooms[roomIndex].users.filter(
							(roomUser) => roomUser.user.username !== userDetails.username
						);
					}
					return newRooms;
				});
			});
			return () => {
				joinSubscription.unsubscribe();
				leaveSubscription.unsubscribe();
			};
		},
		[ chatSocket ]
	);

	useEffect(
		() => {
			if (chatSocket === null) return;
			const deleteSubscription = chatSocket.onRoomDelete().subscribe((deletedRoom) => {
				snackbarMsg.current = `Room ${deletedRoom} has been deleted.`;
				setOpenSnackbar(true);
				if (roomCode === deletedRoom) setRoomCode((roomCode) => '');
				setRooms((prevRooms) => prevRooms.filter((room) => room.code !== deletedRoom));
			});
			const messageSubscription = chatSocket.onMessage().subscribe(({ newMsg, updatedRoom }) => {
				setRooms((prevRooms) => {
					const newRooms = [ ...prevRooms ];
					const roomIndex = 0;
					if (newMsg !== undefined){
					 	newRooms.findIndex((room) => room.code === newMsg.roomCode);
					}
					if (roomIndex >= 0) {
						if (updatedRoom) newRooms[roomIndex] = updatedRoom;
						if (newMsg !==undefined && newMsg.roomCode !== roomCode) {
							newRooms[roomIndex] = updateUnread(newRooms[roomIndex], false);
							audio.play();
						}
					}
					return newRooms;
				});
			});
			return () => {
				deleteSubscription.unsubscribe();
				messageSubscription.unsubscribe();
			};
		},
		[ chatSocket, roomCode, userDetails.username, updateUnread ]
	);

	useEffect(() => {
		// console.log("hello");
		// console.log(userDetails);
	}, []);

	const getCurrentRoom = () => {
		console.log(rooms)
		return rooms.find((room) => room.code === roomCode);
	};

	const handleRoomClick = (code) => {
		setRoomCode(code);
		setRooms((prevRooms) => {
			const newRooms = [ ...prevRooms ];
			const roomIndex = newRooms.findIndex((room) => room.code === code);
			newRooms[roomIndex] = updateUnread(newRooms[roomIndex], true);
			return newRooms;
		});
	};

	const handleRoomLeave = (code) => {
		setRoomCode('');
		setRooms(rooms.filter((room) => room.code !== code));
	};

	const handleModalClose = (room) => {
		if (room) {
			setRooms([ ...rooms, room ]);
			setRoomCode(room.code);
		}
		setOpenModal(false);
	};

	return (
		<div className="room">
			<Sidebar onNewRoom={() => setOpenModal(true)} rooms={rooms} history={history} onRoomClick={handleRoomClick} />
			{roomCode ? (
				<React.Fragment>
					<Chat roomCode={roomCode} />
					<RoomDetails roomDetails={getCurrentRoom()} onRoomLeave={handleRoomLeave} />
				</React.Fragment>
			) : (
				<div className="chat chat--no-room">
					<div className="chat__header" />
					<div className="chat__body">
						<p className="header__text">
							{rooms.length > 0 ? 'Click a room to start chatting!' : 'Create or Join a room to start a conversation!'}
						</p>
					</div>
				</div>
			)}

			<NewRoom open={openModal} onClose={handleModalClose} />
			<GeneralSnackbar message={snackbarMsg.current} open={openSnackbar} onClose={() => setOpenSnackbar(false)} />
		</div>
	);
};

export default Room;
