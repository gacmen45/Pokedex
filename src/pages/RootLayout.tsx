import React from 'react'
import { Outlet } from 'react-router-dom'
import { AppBar, Toolbar,Container } from '@mui/material'

import logo from './../assets/logo.png'
const RootLayout = () => {
	return (
		<>
			<AppBar position='sticky' sx={{ backgroundColor: '#ef5350' }} >
				<Toolbar >
				</Toolbar>
			</AppBar>
			<Container>
				<Outlet />
				</Container>
		</>
	)
}

export default RootLayout
