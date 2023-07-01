import React from 'react'
import { } from 'react-chartjs-2'
import BarChart from './BarChart'
import PieChart from './PieChart'
import Grid from '@mui/material/Grid';
import FilmsTable from './FilmsTable';
import { Helmet } from 'react-helmet';
const Dashboard = () => {
  return (
    <>

      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>

      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <BarChart />
        </Grid>
        <Grid item xs={6} md={4}>
          <PieChart />
        </Grid>

      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6} md={6}>
          <FilmsTable />
        </Grid>
        <Grid item xs={6} md={6}>

        </Grid>

      </Grid>



    </>
  )
}

export default Dashboard