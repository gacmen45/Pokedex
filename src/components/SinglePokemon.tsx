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
	margin: '1em',
	borderRadius: '20px',
	filter: 'brightness(130%)',
}

const SinglePokemon = pokemon => {
	const { id, name, types, sprites, height, weight, species, abilities } = pokemon.pokemon

	const newHeight = height / 10
	const newWeight = weight / 10

	const [pokeAbout, setPokeAbout] = useState([])
	const [pokeDescription, setPokeDescription] = useState('')

	const fetchInfo = async () => {
		const res = await fetch(species.url)
		const data = await res.json()

		setPokeAbout(data)
		setPokeDescription(data.flavor_text_entries[0].flavor_text)
	}

	const hp = pokemon.pokemon.stats[0].base_stat

	useEffect(() => {
		fetchInfo()
		// console.log(species.url)
	}, [species.url])

	console.log(pokemon.pokemon.stats.map(x => x.stat))

	return (
		<>
			<Grid
				// types={types}
				container
				direction='row'
				justifyContent='center'
				alignItems='center'
				sx={{ padding: '1em' }}>
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
						<Typography variant='h6'>About:</Typography>
						<CardWrapper types={types} sx={pokeCard}>
							<CardContent>{pokeDescription}</CardContent>
						</CardWrapper>
						<Typography variant='h6'>Abilities:</Typography>
						<CardWrapper types={types} sx={pokeCard}>
							<CardContent>
								<ul style={{ display: 'flex' }}>
									{abilities.map(item => (
										<li>{item.ability.name}</li>
									))}
								</ul>
							</CardContent>
						</CardWrapper>
						<CardWrapper types={types} sx={pokeCard}>
							<CardHeader title='BaseStats:' />
							<CardContent>
								{pokemon.pokemon.stats.map(x => (
									<Typography variant='h6'>
										{x.stat.name}: {x.base_stat}
									</Typography>
								))}
							</CardContent>
						</CardWrapper>
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

export default SinglePokemon
