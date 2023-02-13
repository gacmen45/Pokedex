import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import PokemonCard from './PokemonCard'
import { useEffect, useState } from 'react'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	display: 'flex',
}

const pokeCard = {
	display: 'flex',
	flexDirection: 'column',
	border: '3px solid black',
}

function BasicModal(pokemon) {
	const [open, setOpen] = React.useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)

	const { id, name, types, sprites, height, weight, species,abilities} = pokemon.pokemon

	const newHeight = height / 10
	const newWeight = weight / 10


	const [pokeAbout, setPokeAbout] = useState([])

	const fetchInfo = async () => {
		const res = await fetch(species.url)
		const data = await res.json()

        // console.log(data.flavor_text_entries[0].flavor_text)
		setPokeAbout(data)
	}

	useEffect(() => {
        fetchInfo()
        // console.log(species.url)
    }, [species.url])


console.log(abilities.map(item => item.ability.name))

	return (
		<div>
			<Button onClick={handleOpen}>More Info</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Box sx={pokeCard}>
						<Typography variant='h4'>{id}</Typography>
						<Typography variant='h4'>{name}</Typography>
						<Box component='img' src={sprites.front_default} sx={{ height: 250 }} />
						<ul>
							{types.map((type, index) => (
								<li key={index}>
									<Typography version='h5'>{type.type.name}</Typography>
								</li>
							))}
						</ul>
						<Typography variant='h6'>Height:{newHeight}m</Typography>
						<p></p>
						<Typography variant='h6'>Weight:{newWeight}kg</Typography>
						<p></p>
					</Box>
					<Box sx={pokeCard}>
						<Typography variant='h4'>About:</Typography>
						<Typography variant='h4'>Abilities:</Typography>
                        <ul>
                            {abilities.map(item => (
                                <li>{item.ability.name}</li>))}
                        </ul>

					</Box>
				</Box>
			</Modal>
		</div>
	)
}

export default BasicModal
