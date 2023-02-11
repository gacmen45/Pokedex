import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'
import { Container } from '@mui/system'
import Pagination from '@mui/material/Pagination';

const MainPage = () => {
	const [pokemonData, setPokemonData] = useState([])

	const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [prevPageUrl, setPrevPageUrl] = useState('')
	const [loading, setLoading] = useState(false)

	const nextPage = () => {
		setCurrentPageUrl(nextPageUrl)
	}
	const prevPage = () => {
		setCurrentPageUrl(prevPageUrl)
	}

	const fetchPokemons = async () => {
		setLoading(true)
		const res = await fetch(currentPageUrl)
		const data = await res.json()
		setLoading(false)
		setNextPageUrl(data.next)
		setPrevPageUrl(data.previous)

		const pokemonPromises = data.results.map(pokemon =>
			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
		)

		const pokemons = await Promise.all(pokemonPromises)
		setPokemonData(pokemons)
	
	}

	useEffect(() => {
		fetchPokemons()
	}, [currentPageUrl])

	if (loading) {
		return <p>loading...</p>
	}

	console.log(pokemonData.map(pokemon => pokemon.sprites))

	return (
		<Container>
			<Grid container spacing='4'>
				{pokemonData.map(pokemon => (
					<Grid key={pokemon.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
						<Card>
							<CardHeader title={`#${pokemon.id}`} />
							<CardMedia component='img' width='150' image={pokemon.sprites.front_default} />
							<CardContent>
								<Typography variant='h5' component='h2'>{pokemon.name}</Typography>
						</CardContent>
						</Card>
					</Grid>
				))}
			</Grid>
			<Pagination count={10} variant='outlined'/>
			<button onClick={prevPageUrl ? prevPage : null}>prev</button>
			<button onClick={nextPageUrl ? nextPage : null}>next</button>
		</Container>
	)
}

export default MainPage
