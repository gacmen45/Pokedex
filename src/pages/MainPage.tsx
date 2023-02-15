import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from '@mui/system'

import PokemonCard from '../components/PokemonCard'

import Pagination from '../components/Pagination'
import FilterBar from '../components/FilterBar'

const MainPage = () => {
	const [pokemonData, setPokemonData] = useState([])
	const [search,setSearch] = useState('')

	// const baseUrl = 'https://pokeapi.co/api/v2'
	// const itemsPerPage = 20
	const itemsPerPage = 10
	// const searchingPoke = `pokemon${search}`
// const limit = `pokemon?limit=${itemsPerPage}`
// const limit = `${searchingPoke}?limit=${itemsPerPage}`


//search

	// const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
	const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon/')
	// const [currentPageUrl, setCurrentPageUrl] = useState(`${baseUrl}/${limit}`)

	const [nextPageUrl, setNextPageUrl] = useState('')
	const [prevPageUrl, setPrevPageUrl] = useState('')
	const [loading, setLoading] = useState(false)


	const [totalPages, setTotalPages] = useState(0)
	const [page, setPage] = useState(1)

const [allPokemons,setAllPokemons] = useState([])
	const testURL = 'https://pokeapi.co/api/v2/pokemon?limit=10000'



//search
const searchHandler = (e) => {
setSearch(e.target.value)
}


	const nextPage = () => {
		setCurrentPageUrl(nextPageUrl)
		setPage(current => current + 1)
	}
	const prevPage = () => {
		setCurrentPageUrl(prevPageUrl)
		setPage(current => current - 1)
	}

	const fetchPokemons = async () => {
		setLoading(true)
		const res = await fetch(currentPageUrl)
		const res2 = await fetch(testURL)
		const data = await res.json()
		const data2 = await res2.json()
		setLoading(false)
		setNextPageUrl(data.next)
		setPrevPageUrl(data.previous)



		setTotalPages(Math.ceil(data.count / itemsPerPage))

		const pokemonPromises = data.results.map(pokemon =>
			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
		)
		const pokemonPromises2 = data2.results.map(pokemon =>
			fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())
		)

		const pokemons = await Promise.all(pokemonPromises)
		const allPokemons = await Promise.all(pokemonPromises2)
		
		setPokemonData(pokemons)
		setAllPokemons(allPokemons)


	}

	useEffect(() => {
		fetchPokemons()
	}, [currentPageUrl,])

	if (loading) {
		return <CircularProgress />
	}


	// console.log(pokemonData.map(pokemon => (pokemon.name.includes('bulbasaur'))))
console.log(allPokemons.map(pokemon => (pokemon.name.includes(search))))






	return (
		<Container>
<div>
    <label htmlFor="">Search</label>
    <input type="text" onChange={searchHandler}/>
</div>
{/* <FilterBar/> */}

			<Pagination
				prevPageUrl={prevPageUrl}
				nextPageUrl={nextPageUrl}
				totalPages={totalPages}
				nextPage={nextPage}
				prevPage={prevPage}
				page={page}
			/>

			<Grid container spacing='4'>
				{/* {pokemonData.map(pokemon => ( */}
				{allPokemons.map(pokemon => ( pokemon.name.includes(search)&&
					<PokemonCard key={pokemon.id} pokemon={pokemon} />
					
				))}
			</Grid>
		</Container>
	)
}

export default MainPage
