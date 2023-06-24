import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, PieController, ArcElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getAllFilms } from '../../../api/requests';
ChartJS.register(Title, Tooltip, Legend, PieController, ArcElement);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const PieChart = () => {
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
        data: Object.values(getCategories()),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <Chart type="pie" options={options} data={chartData} />
    </div>
  );
}

export default PieChart;
