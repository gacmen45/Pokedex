import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import styled from '@emotion/styled'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { useState } from 'react'
import PokemonModal from './PokemonModal'

import { CardWrapper } from '../util/CardBgc'
import { TypeChip } from '../util/ChipBgc'

const PokemonCard = pokemon => {
	const { id, name, types, sprites } = pokemon.pokemon

	return (
		<Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2}>
			{/* <CardWrapper type={types[0].type.name}> */}
			<CardWrapper types={types}>
				<CardHeader title={`#${id}`} />
				<PokemonModal pokemon={pokemon.pokemon} />
				<CardMedia component='img' width='150' image={sprites.front_default} />
				<CardContent>
					<Typography variant='h5' component='h2'>
						{name}
					</Typography>

					<Stack direction='row' spacing={3}>
						{types.map((type, index) => (
							<TypeChip type={type.type.name} label={type.type.name} key={index}  sx={{filter:'brightness(60%)',color:'black',textTransform:'uppercase',}}/>
						))}
					</Stack>
				</CardContent>
			</CardWrapper>
		</Grid>
	)
}

export default PokemonCard
