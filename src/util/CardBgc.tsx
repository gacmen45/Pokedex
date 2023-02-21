import styled from '@emotion/styled'
import { Card } from '@mui/material'

export const CardWrapper = styled(Card)(({ theme, types }) => {
	let bgColor = '#A0A29F'
	if (types.length === 1) {
		switch (types[0].type.name) {
			case 'grass':
				bgColor = '#5FBD58'
				break
			case 'fire':
				bgColor = '#dc872f'
				break
			case 'water':
				bgColor = '#539DDF'
				break
			case 'bug':
				bgColor = '#92BC2C'
				break
			case 'dark':
				bgColor = '#595761'
				break
			case 'dragon':
				bgColor = '#0C69C8'
				break
			case 'electric':
				bgColor = '#F2D94E'
				break
			case 'fairy':
				bgColor = '#EE90E6'
				break
			case 'fighting':
				bgColor = '#D3425F'
				break
			case 'flying':
				bgColor = '#A1BBEC'
				break
			case 'ghost':
				bgColor = '#5F6DBC'
				break
			case 'ground':
				bgColor = '#DA7C4D'
				break
			case 'ice':
				bgColor = '#75D0C1'
				break
			case 'normal':
				bgColor = '#A0A29F'
				break
			case 'poison':
				bgColor = '#B763CF'
				break
			case 'psychic':
				bgColor = '#ff2ca8'
				break
			case 'rock':
				bgColor = '#a38c21'
				break
			case 'steel':
				bgColor = '#5695A3'
				break
			default:
				break
		}
	} else {
		const gradients = types.map(type => {
			switch (type.type.name) {
				case 'grass':
					return '#5FBD58'

				case 'fire':
					return 'red'

				case 'water':
					return 'blue'

				case 'bug':
					return '#92BC2C'
				case 'dark':
					return '#595761'
				case 'dragon':
					return '#0C69C8'
				case 'electric':
					return '#F2D94E'
				case 'fairy':
					return '#EE90E6'
				case 'fighting':
					return '#D3425F'
				case 'flying':
					return '#A1BBEC'
				case 'ghost':
					return '#5F6DBC'
				case 'ground':
					return '#DA7C4D'
				case 'ice':
					return '#75D0C1'
				case 'normal':
					return '#A0A29F'
				case 'poison':
					return '#B763CF'
				case 'psychic':
					return '#ff2ca8'
				case 'rock':
					return '#a38c21'
				case 'steel':
					return '#5695A3'
				default:
					return 'grey'
			}
		})
		bgColor = `linear-gradient( ${gradients.join(',')})`
	}
	return {
		background: bgColor,
	}
})
