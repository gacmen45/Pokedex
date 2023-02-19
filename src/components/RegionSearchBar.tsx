import { useState } from 'react'
import { getPokemons } from '../utility/api'

const RegionSearchBar = () => {
	const [region, setRegion] = useState('')

	switch (region) {
		case 'Kanto':
			getPokemons(150,0)
			break
		case 'Johto':
			console.log('Johto Region')
			break
	}

    const changeValueHandler = (e) =>{
       setRegion(e.target.value)
    }


	return (
		<select name='' id='' onChange={changeValueHandler}>
			<option value='' disabled>Choose Region</option>
			<option value='Kanto' >Kanto (1-151)</option>
            
			<option value='Johto' >Johto (2-152)</option>
		</select>
	)
}

export default RegionSearchBar
