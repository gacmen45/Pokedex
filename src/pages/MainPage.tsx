import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material/'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import axios from 'axios'

const MainPage = () => {
	const [pokemonData, setPokemonData] = useState([])

	const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
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

		const createPokemonObj = results => {
			results.forEach(async pokemon => {
				const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
				const data = await res.json()
				setPokemonData(currentList => [...currentList, data])
			})
		}
		createPokemonObj(data.results)
	}

	useEffect(() => {
		fetchPokemons()
	}, [currentPageUrl])

	if (loading) {
		return <p>loading...</p>
	}


	return (
		<ul>
			{pokemonData.map(pokemon => (
				<li>
					<span>#0{pokemon.id} </span>
					{pokemon.name}
				</li>
			))}

			<button onClick={prevPageUrl?prevPage :null }>prev</button>
			<button onClick={nextPageUrl?nextPage :null}>next</button>
		</ul>
	)
}

export default MainPage
