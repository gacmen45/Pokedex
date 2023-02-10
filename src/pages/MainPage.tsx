import React from 'react'
import {Grid, Typography} from '@mui/material/';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const  MainPage=()=> {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
        <Card>
          <CardHeader title='1'/>
          <CardMedia component='img' height='190' image='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg'/>
          <CardContent>
            <Typography variant='h6'>Bulbasaur</Typography>
          </CardContent>
        </Card>
      </Grid>
     
    </Grid>
  )
}

export default MainPage