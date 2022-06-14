import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import './style.css';


function GeneralSnackbar({ message, open, onClose }) {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		onClose();
	};

	return (
		<div className="general__snackbar">
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={message}
				action={
					<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
						<CloseIcon fontSize="small" />
					</IconButton>
				}
			/>
		</div>
	);
}

export default GeneralSnackbar;
