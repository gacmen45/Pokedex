import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import { Container } from '@mui/system'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import PokemonCard from '../components/PokemonCard'

import Pagination from '../components/Pagination'

const container = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: '0.5em',
}
const searchBar = {
	display: 'flex',
}

const MainPage = () => {
	const [pokemons, setPokemons] = useState([])
	const [loading, setLoading] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const itemsPerPage = 20

	const [currentPage, setCurrentPage] = useState(`https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}`)
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [prevPageUrl, setPrevPageUrl] = useState('')
	const [page, setPage] = useState(1)
	const [totalPages, setTotalPages] = useState(0)

	const nextPage = () => {
		setCurrentPage(nextPageUrl)
		setPage(current => current + 1)
	}
	const prevPage = () => {
		setCurrentPage(prevPageUrl)
		setPage(current => current - 1)
	}

	//fetch pokemon with search button
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

	//get all pokemos
	const getPokemons = async (limit = 50, offset = 0) => {
		try {
			let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
			const response = await fetch(currentPage)
			return await response.json()
		} catch (error) {
			console.log('error: ', error)
		}
	}

	//get pokemon data
	const getPokemonData = async url => {
		try {
			const response = await fetch(url)
			return await response.json()
		} catch (error) {
			console.log('error: ', error)
		}
	}

	//fetch pokemons and fill with data
	const fetchPokemons = async () => {
		try {
			setLoading(true)
			const data = await getPokemons()
			setNextPageUrl(data.next)
			setPrevPageUrl(data.previous)
			setTotalPages(Math.ceil(data.count / itemsPerPage))
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

	//input value handler
	const inputValueHandler = e => {
		setInputValue(e.target.value)
	}

	//searching button function
	const searchHandler = () => {
		if (inputValue === '') {
			return
		} else searchPokemons(inputValue)
	}

	//show all button function
	const showAll = () => {
		fetchPokemons()
		setInputValue('')
		setPage(1)
		setCurrentPage('https://pokeapi.co/api/v2/pokemon?limit=20')
	}

	useEffect(() => {
		fetchPokemons()
	}, [currentPage, itemsPerPage])

	if (loading) {
		return <CircularProgress />
	}

	return (
		<Container sx={{ marginTop: '2em' }}>
			<Box sx={container}>
				<Box sx={searchBar}>
					<TextField
						id='outlined-basic'
						label='Search'
						variant='outlined'
						onChange={inputValueHandler}
						type='text'
						value={inputValue}
						placeholder='enter name or id'
					/>
					
					<Stack spacing={2} direction='row'>
						<Button variant='contained' onClick={searchHandler} sx={{marginLeft:'1em'}}>
							search
						</Button>
						<Button variant='contained' onClick={showAll}>show All</Button>
					</Stack>
				</Box>
				<Pagination prevPage={prevPage} nextPage={nextPage} page={page} totalPages={totalPages} />
			</Box>

			<Grid container spacing='4'>
				{pokemons.map(pokemon => (
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
				))}
			</Grid>
		</Container>
	)
}

export default MainPage
