import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import Stack from '@mui/material/Stack'


import PokemonModal from './PokemonModal'

import { CardWrapper } from '../util/CardBgc'
import { TypeChip } from '../util/ChipBgc'
import { textAlign } from '@mui/system'

const PokemonCard = pokemon => {
	const { id, name, types, sprites } = pokemon.pokemon

	return (
		<Grid key={id} item xs={12} sm={6} md={4} lg={3} xl={2}>
			<CardWrapper types={types}>
				<Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
				<CardHeader title={`#${id}`} />
				<PokemonModal pokemon={pokemon.pokemon} />
				</Box>
				<CardMedia component='img' width='150' image={sprites.front_default} />
				<CardContent>
					<Typography variant='h5' component='h2' sx={{textAlign:'center',textTransform:'uppercase',fontWeight:'bold'}}>
						{name}
					</Typography>

					<Stack direction='row' spacing={3} sx={{justifyContent:'center',marginTop:'1em'}}>
						{types.map((type, index) => (
							<TypeChip type={type.type.name} label={type.type.name} key={index}  sx={{filter:'brightness(80%)',color:'white',textTransform:'uppercase',}}/>
						))}
					</Stack>
				</CardContent>
			</CardWrapper>
		</Grid>
	)
}

export default PokemonCard
