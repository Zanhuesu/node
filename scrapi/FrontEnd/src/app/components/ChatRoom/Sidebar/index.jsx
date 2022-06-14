import React from 'react';
import './style.css';
import SidebarRoom from '../SidebarRooms';
import { useHistory } from 'react-router-dom';
// import Scrollbar from 'react-scrollbars-custom';
import Scrollbar from 'react-perfect-scrollbar'
import SidebarHeader from '../SidebarHeader';
import { useUser } from '../../../contexts/UserContext';

const Sidebar = ({ onNewRoom, rooms, history, onRoomClick }) => {
	const { userDetails } = useUser();
	return (
		<div className="sidebar">
			<SidebarHeader onNewRoom={onNewRoom} history={history} />

			{/* TODO future implementation */}
			{/* <div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchIcon />
					<input type="text" placeholder="Search or start new chat" />
				</div>
			</div> */}

			<div className="sidebar__rooms">
				<Scrollbar className="sidebar__scrollbar">
					{rooms.map((room, i) => (
						<SidebarRoom key={i} room={room} userDetails={userDetails} onRoomClick={onRoomClick} />
					))}
				</Scrollbar>
			</div>
		</div>
	);
};

export default Sidebar;
