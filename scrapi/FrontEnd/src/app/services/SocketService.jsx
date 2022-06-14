import { ChatEvent } from '../constants';
import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs';

export class SocketService {
	socket = {};

	init() {
		console.log('Initializing Socket Service');
		this.socket = io(process.env.REACT_APP_SERVER_URL);
		return this;
	}

	join = (userRoom, isFirst) => {
		console.log(`${userRoom.name} joined ${userRoom.room}`);
		this.socket.emit(ChatEvent.JOIN, { userRoom, isFirst });
	}

	send = (message) => {
		console.log('Sending Message: ' + message);
		this.socket.emit(ChatEvent.MESSAGE, message);
	}

	updateUnread = (unread, roomCode, username) => {
		this.socket.emit(ChatEvent.UNREAD, { unread, roomCode, username });
	}

	onJoin() {
		return fromEvent(this.socket, ChatEvent.JOIN);
	}

	onLeave() {
		return fromEvent(this.socket, ChatEvent.LEAVE);
	}

	onRoomDelete() {
		return fromEvent(this.socket, ChatEvent.ROOM_DELETE);
	}

	onMessage(){
		return fromEvent(this.socket, ChatEvent.MESSAGE);
	}

	disconnect(){
		console.log('Disconnecting...');
		this.socket.disconnect();
	}
}
