
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import { Typography } from '@mui/material'

const center = {
	display: 'flex',
	flexDirection:'column',
	justifyContent: 'center',
	alignItems: 'center',
}


const Pagination = ({ prevPage, nextPage,page,totalPages }) => {
	return (
		<Box sx={center}>
			<Stack spacing={2} direction='row'>
			<Button variant="outlined" onClick={prevPage}>prev</Button>
			<Button variant="outlined" onClick={nextPage}>next</Button>

			</Stack>
			<Typography sx={{marginTop:'.5em'}}>
				page {page} of {totalPages}
			</Typography>
		</Box>
	)
}

export default Pagination
