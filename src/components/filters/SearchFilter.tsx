import { useState } from "react"
const SearchFilter =() => {


    const [search,setSearch] = useState('')

const handlerInput = (e) => {
setSearch(e.target.value)
}

const baseUrl = 'https://pokeapi.co/api/v2'
const query = {pokemon:'pokemon'}

const getPokemon = async(pokemon) => {
const res = await fetch(`${baseUrl}/${query.pokemon}/${pokemon}`)
const data = await res.json()

console.log(data)
console.log(search)
}

getPokemon(search)

return <div>
    <label htmlFor="">Search</label>
    <input type="text" onChange={handlerInput} />
</div>
}

export default SearchFilter