import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Toolbar,Container } from '@mui/material'

const RootLayout = () => {
	return (
		<>
			<AppBar position='sticky' sx={{ backgroundColor: '#ef5350' }}>
				<Toolbar></Toolbar>
			</AppBar>
			<h1>Test</h1>
			<Container>
				<Outlet />
				</Container>
		</>
	)
}

export default RootLayout
