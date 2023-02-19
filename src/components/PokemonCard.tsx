import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

import { useState } from 'react'

import PokemonModal from './PokemonModal'
const PokemonCard = pokemon => {
	const { id, name, types, sprites } = pokemon.pokemon


	const [open, setOpen] = useState(false);

	const handleOpen = () => {
	  setOpen(true);
	};
  
	const handleClose = () => {
	  setOpen(false);
	};


			return (
				<Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2}>
			
			<Card>
				<CardHeader title={`#${id}`} />
						<PokemonModal pokemon={pokemon.pokemon}/>
				<CardMedia component='img' width='150' image={sprites.front_default} />
				<CardContent>
					<Typography variant='h5' component='h2'>
						{name}
					</Typography>
					<ul>
						{types.map((type, index) => (
							<li key={index}>
								<Typography version='h5'>{type.type.name}</Typography>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</Grid>
	)
}

export default PokemonCard
