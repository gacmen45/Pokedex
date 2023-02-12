import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from '@mui/system'

import PokemonCard from '../components/PokemonCard'

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
		return <CircularProgress />
	}


	return (
		<Container>
			<button onClick={prevPageUrl ? prevPage : null}>prev</button>
			<button onClick={nextPageUrl ? nextPage : null}>next</button>
			<Grid container spacing='4'>
				{pokemonData.map(pokemon => (
					<PokemonCard key={pokemon.id} pokemon={pokemon}/>
				))}
			</Grid>
		</Container>
	)
}

export default MainPage
