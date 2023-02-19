import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Toolbar, Container } from '@mui/material'

const center = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: '0.5em',
}
const logo = {
	width: '150px',
}

const RootLayout = () => {
	return (
		<>
			<AppBar position='sticky' sx={{ backgroundColor: '#ef5350' }}>
				<Toolbar sx={center}>
					<img width={150} src='https://seeklogo.com/images/P/Pokemon-logo-497D61B223-seeklogo.com.png' alt='' />
				</Toolbar>
			</AppBar>
			<Container>
				<Outlet />
			</Container>
		</>
	)
}

export default RootLayout
