import { useState, useEffect } from 'react'
import { GridTest } from '../util/GridBgx'
import { Grid } from '@mui/material'
import { TypeChip } from '../util/ChipBgc'
import Stack from '@mui/material/Stack'

const test = {
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	alignItems: 'center',
    fontSize:'20px'
}

const SinglePokemon2 = pokemon => {
	const { id, name, types, sprites, height, weight, species, abilities } = pokemon.pokemon

	const newHeight = height / 10
	const newWeight = weight / 10

	let newId
	if (id < 10) {
		newId = `00${id}`
	} else if (id >= 10 && id < 100) {
		newId = `0${id}`
	} else {
		newId = id
	}

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
		<Grid container direction='row' justifyContent='center' alignItems='center'>
			<GridTest item xs={12} md={5} sx={test} types={types}>
				<div style={{textAlign:'center'}}>
					<h2>#{newId} </h2>
					<h2 style={{textTransform:'uppercase'}}>{name} </h2>
				</div>
				<img src={sprites.front_default} alt={`photo of ${name}`} loading='lazy' style={{ width: '80%' }} />
				<Stack direction='row' spacing={3} sx={{ justifyContent: 'center' }}>
					{types.map((type, index) => (
						<TypeChip
							type={type.type.name}
							label={type.type.name}
							key={index}
							sx={{ filter: 'brightness(80%)', color: 'white', textTransform: 'uppercase' }}
						/>
					))}
				</Stack>
				<div>
					<p>
                    <span style={{fontWeight:'bold'}}>Height: </span>{newHeight}m
					</p>
					<p>
                    <span style={{fontWeight:'bold'}}>Weight:</span> {newWeight}kg
					</p>
				</div>
			</GridTest>
			<GridTest item xs={12} md={7} types={types} sx={test}>
				<h3>About:</h3>
				<p style={{ textAlign: 'center' }}>{pokeDescription}</p>

				<h3>Abilities:</h3>
				{/* <ul style={{listStyle:'none'}}>
					{abilities.map(item => (
						<li >{item.ability.name}</li>
					))}
				</ul> */}
				<div style={{textAlign:'center'}}>
					{abilities.map(item => (
						<p>{item.ability.name}</p>
					))}
				</div>

				<h3>BaseStats:</h3>
				{pokemon.pokemon.stats.map(x => (
					<p>
						<span style={{fontWeight:'bold'}}>{x.stat.name}</span>: {x.base_stat}
					</p>
				))}
			</GridTest>
		</Grid>
	)
}

export default SinglePokemon2
