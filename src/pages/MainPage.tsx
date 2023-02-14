import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from '@mui/system'

import PokemonCard from '../components/PokemonCard'

import Pagination from '../components/Pagination'

const MainPage = () => {
	const [pokemonData, setPokemonData] = useState([])
	
	const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [prevPageUrl, setPrevPageUrl] = useState('')
	const [loading, setLoading] = useState(false)
	
	const itemsPerPage = 20

	const [totalPages,setTotalPages] = useState(0)
	const [page,setPage] = useState(1)


	const nextPage = () => {
		setCurrentPageUrl(nextPageUrl)
		setPage(current =>current +1)
	}
	const prevPage = () => {
		setCurrentPageUrl(prevPageUrl)
		setPage(current =>current -1)
	}

	const fetchPokemons = async () => {
		setLoading(true)
		const res = await fetch(currentPageUrl)
		const data = await res.json()
		setLoading(false)
		setNextPageUrl(data.next)
		setPrevPageUrl(data.previous)

		setTotalPages(Math.ceil(data.count/itemsPerPage))



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
			<Pagination prevPageUrl={prevPageUrl} nextPageUrl={nextPageUrl} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} page={page}/>
			{/* <button onClick={prevPageUrl ? prevPage : null}>prev</button>
			<button onClick={nextPageUrl ? nextPage : null}>next</button>
			<p>page {page} of {totalPages}</p> */}



			<Grid container spacing='4'>
				{pokemonData.map(pokemon => (
					<PokemonCard key={pokemon.id} pokemon={pokemon}/>
				))}
			</Grid>
		</Container>
	)
}

export default MainPage
