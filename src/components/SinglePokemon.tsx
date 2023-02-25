import { useState, useEffect } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

import { ModalBox } from '../util/ModalBgc'
import { CardWrapper } from '../util/CardBgc'
import { Card, CardContent, CardHeader, Grid } from '@mui/material'
import { GridTest } from '../util/GridBgx'
import CardMedia from '@mui/material/CardMedia'

import { TypeChip } from '../util/ChipBgc'

import Stack from '@mui/material/Stack'
const pokeCard = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '1em',
	borderRadius: '20px',
	filter: 'brightness(130%)',
}

const SinglePokemon = pokemon => {
	const { id, name, types, sprites, height, weight, species, abilities } = pokemon.pokemon

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
		<>
			<GridTest types={types} container sx={{ padding: '1em' }}>
				<Grid item xs={12} md={4}>
					<CardWrapper types={types} sx={pokeCard}>
						<Typography variant='h4'>#{id}</Typography>
						<Typography variant='h4' sx={{ textAlign: 'center', textTransform: 'uppercase', fontWeight: 'bold' }}>
							{name}
						</Typography>
						<CardMedia component='img' image={sprites.front_default} sx={{ maxWidth: '200px' }} />
						<CardContent>
							<Stack direction='row' spacing={3} sx={{ justifyContent: 'center', marginTop: '1em' }}>
								{types.map((type, index) => (
									<TypeChip
										type={type.type.name}
										label={type.type.name}
										key={index}
										sx={{ filter: 'brightness(80%)', color: 'white', textTransform: 'uppercase' }}
									/>
								))}
							</Stack>

							<Box sx={{ marginTop: '1em' }}>
								<Typography variant='h6'>Height:{newHeight}m</Typography>
								<Typography variant='h6'>Weight:{newWeight}kg</Typography>
							</Box>
						</CardContent>
					</CardWrapper>
				</Grid>
				<Grid item xs={12} md={8}>
					<Box sx={pokeCard}>
						<Typography variant='h4'>About:</Typography>
						<Typography variant='h4'>Abilities:</Typography>
						<ul>
							{abilities.map(item => (
								<li>{item.ability.name}</li>
							))}
						</ul>
					</Box>
				</Grid>
			</GridTest>
		</>
	)
}

export default SinglePokemon
