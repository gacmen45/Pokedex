import { useState, useEffect } from 'react'

const RegionFilter = () => {
	const [pokemonData, setPokemonData] = useState()
const [gen,setGen] = useState()
	const fetchPokemons = async () => {
		const res = await fetch(`https://pokeapi.co/api/v2/generation/`)
		const data = await res.json()
		setPokemonData(data)

		// const pokemonPromises = data.results.map(pokemon =>
		// 	fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(res => res.json())

// const regionPromises = data.results.map(region => (
// 	fetch(`https://pokeapi.co/api/v2/generation/${region.id}`).then(res => res.json())
// ))
	}

useEffect(()=>{
	fetchPokemons()
},[])

const genHandler = (value) => {
	setGen(value)
}




	return (
		<div>
			<h3>REGION</h3>
			<select name="" id="">
				
			</select>

		</div>
	)
}

export default RegionFilter
