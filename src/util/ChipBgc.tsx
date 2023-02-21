import styled from '@emotion/styled'
import Chip from '@mui/material/Chip'

export const TypeChip = styled(Chip)(({ theme, type }) => {

    let bgColor = ''
	switch (type) {

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
    return {
		background: bgColor,
	}
})
