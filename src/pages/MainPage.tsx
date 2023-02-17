import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from '@mui/system'

import PokemonCard from '../components/PokemonCard'

import Pagination from '../components/Pagination'


const MainPage = () => {
	const [pokemons, setPokemons] = useState([])
	const [loading, setLoading] = useState(false)
	const [inputVal, setInputVal] = useState('')

	const [numberOfPokemon , setNumberOfPokemon] = useState()
	
	
	
	const [currentPage,setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon?limit=50')
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [prevPageUrl, setPrevPageUrl] = useState('')
	


	const nextPage = () => {
		setCurrentPage(nextPageUrl)
		
	}
	const prevPage = () => {
		setCurrentPage(prevPageUrl)
		
	}

	const getPokemons = async (limit = 50, offset = 0) => {
		try {
			let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
			const response = await fetch(currentPage)
			return await response.json()
		} catch (error) {
			console.log('error: ', error)
		}
	}
	const getPokemonData = async url => {
		try {
			const response = await fetch(url)
			return await response.json()
		} catch (error) {
			console.log('error: ', error)
		}
	}

	const searchPokemons = async pokemon => {
		try {
			let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
			const response = await fetch(url)
			const data = await response.json()
			setPokemons([data])
		} catch (error) {
			console.log('error: ', error)
		}
	}

	const fetchPokemons = async () => {
		try {
			setLoading(true)
			const data = await getPokemons()
			setNextPageUrl(data.next)
			setPrevPageUrl(data.previous)
			const promises = data.results.map(async pokemon => {
				return await getPokemonData(pokemon.url)
			})

			const results = await Promise.all(promises)
			setPokemons(results)
			setLoading(false)
		} catch (error) {
			console.log(error)
		}
	}

	const input = e => {
		setInputVal(e.target.value)
	}

	const test = pokemon => {
		if (!pokemon) {
			// if (pokemon === '') {
			fetchPokemons()
		} else {
			searchPokemons(pokemon)
		}
	}

	const handler = () => {
		if (inputVal === '') {
			fetchPokemons()
		} else searchPokemons(inputVal)
	}
	const showAll = () => {
		fetchPokemons()
		setInputVal('')
		setCurrentPage('https://pokeapi.co/api/v2/pokemon?limit=20')
	}


const handlerNumber = (e) => {
	setNumberOfPokemon(e.target.value)
}

	useEffect(() => {
		fetchPokemons()
		// test(inputVal)
		// }, [inputVal])
	}, [currentPage])

	return (
		<Container>
			<input onChange={input} type='text' value={inputVal} />
			<button onClick={handler}>search</button>
			<button onClick={showAll}>showAll</button>

		<button onClick={prevPage}>prev</button>
		<button onClick={nextPage}>next</button>

			{/* <Pagination prevPageUrl={prevPageUrl} nextPageUrl={nextPageUrl} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} page={page}/> */}
			{/* <button onClick={prevPageUrl ? prevPage : null}>prev</button>
			<button onClick={nextPageUrl ? nextPage : null}>next</button>
			<p>page {page} of {totalPages}</p> */}

			<Grid container spacing='4'>
				{pokemons.map(pokemon => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</Grid>
		</Container>
	)
}

export default MainPage
