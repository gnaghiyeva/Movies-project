import React from 'react'
import { } from 'react-chartjs-2'
import BarChart from './BarChart'
import PieChart from './PieChart'
import Grid from '@mui/material/Grid';
import FilmsTable from './FilmsTable';
import { Helmet } from 'react-helmet';
import Totals from './Totals';
import Users from './Users';
import Categories from './Categories';
const Dashboard = () => {
  return (
    <>

      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Totals />
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <h1 style={{textAlign:'center'}}>Movies by rating</h1> 
          <BarChart />
        </Grid>
        <Grid item xs={6} md={4}>
          <PieChart />
        </Grid>
  
      </Grid>
      <div style={{width:'60%', margin:'0 auto',padding:'80px 60px'}}>
      <h1 style={{textAlign:'center'}}>Number of movies by category</h1> 
        <Categories />
      </div>
      <Grid container spacing={2}>
        <Grid item xs={6} md={6} style={{padding:'80px 60px'}}>
          <h1 style={{textAlign:'center'}}>All Films</h1>
          <FilmsTable />
        </Grid> <br />

        <Grid item xs={6} md={6} style={{padding:'80px 60px'}}>
        <h1 style={{textAlign:'center'}}>All Users</h1>
          <Users />
        </Grid>
      </Grid>





    </>
  )
}

export default Dashboard