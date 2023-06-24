import React from 'react'
import { } from 'react-chartjs-2'
import BarChart from './BarChart'
import PieChart from './PieChart'
import Grid from '@mui/material/Grid';

const Dashboard = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
        <BarChart />
        </Grid>
        <Grid item xs={6} md={4}>
        <PieChart />
        </Grid>
        
      </Grid>
     
      
    </>
  )
}

export default Dashboard