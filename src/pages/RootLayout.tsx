import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout =() =>{
	return (
		<>
        <h1>Test</h1>
			<main>
				<Outlet />
			</main>
		</>
	)
}

export default RootLayout
