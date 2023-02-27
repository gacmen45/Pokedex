import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import InfoIcon from '@mui/icons-material/Info';

import SinglePokemon from './SinglePokemon'
import SinglePokemon2 from './SinglePokemon2';



const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	height:'60%',
	bgcolor: 'beige',
	borderRadius:'20px',
	boxShadow: 24,
	p: 4,
	display: 'flex',
	overflow:'auto',
	padding:'0'
}

function BasicModal(pokemon) {

	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	

	return (
		<div>
			<Button onClick={handleOpen}><InfoIcon sx={{color:'white',opacity:'.5'}}/></Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					{/* <SinglePokemon pokemon={pokemon.pokemon} /> */}
					<SinglePokemon2 pokemon={pokemon.pokemon} />
				</Box>
			</Modal>
		</div>
	)
}

export default BasicModal
