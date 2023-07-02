import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getAllFilms } from '../../../api/requests';
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarController, BarElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Film Categories',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

const VerticalBarChart = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getAllFilms().then((res) => {
      setFilms(res.data);
    });
  }, []);

  const getCategories = () => {
    const categories = {};
    films.forEach((film) => {
      if (categories[film.category]) {
        categories[film.category]++;
      } else {
        categories[film.category] = 1;
      }
    });
    return categories;
  };

  const chartData = {
    labels: Object.keys(getCategories()),
    datasets: [
      {
        label: 'Film Count',
        data: Object.values(getCategories()),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Chart type="bar" options={options} data={chartData} />
    </div>
  );
};

export default VerticalBarChart;
