import { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import CircularProgress from '@mui/material/CircularProgress'
import { Container } from '@mui/system'

import PokemonCard from '../components/PokemonCard'

import { Navigate } from 'react-router-dom'

const MainPage = () => {
	const [pokemonData, setPokemonData] = useState([])
	
	const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')
	const [nextPageUrl, setNextPageUrl] = useState('')
	const [prevPageUrl, setPrevPageUrl] = useState('')
	const [loading, setLoading] = useState(false)
	
	const itemsPerPage = 20

const [page,setPage] = useState(1)
const [totalPages,setTotalPages] = useState(0)


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


console.log(totalPages)

// const indexOfLastPoke = currentPage * pokePerPage
// const indexOfFirstPoke = indexOfLastPoke - pokePerPage
// const currentPoke = pokemonData.slice(indexOfFirstPoke,indexOfLastPoke)

// console.log(currentPoke)

// const pageNumbers = []
// const totalPokemons = pokemonData.length

// const paginate = (pageNumber) => {
// 	setCurrentPage(pageNumber)
// }

// for(let i=1 ; i<= Math.ceil(totalPokemons/pokePerPage);i++){
// 	pageNumbers.push(i)
// }


	return (
		<Container>
			<button onClick={prevPageUrl ? prevPage : null}>prev</button>
			<button onClick={nextPageUrl ? nextPage : null}>next</button>
			<p>page {page} of {totalPages}</p>
{/* <ul>
	{pageNumbers.map(number => (
		<li> <a href={`/${number}`} onClick={() => Navigate(`/${number}`)}>{number}</a></li>
	))}
</ul> */}



			<Grid container spacing='4'>
				{/* {pokemonData.map(pokemon => ( */}
				{pokemonData.map(pokemon => (
					<PokemonCard key={pokemon.id} pokemon={pokemon}/>
				))}
			</Grid>
		</Container>
	)
}

export default MainPage
