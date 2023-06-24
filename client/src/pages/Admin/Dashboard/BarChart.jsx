import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, LineElement, PointElement } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { getAllFilms } from '../../../api/requests';
ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend, LineController, LineElement, PointElement);

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
  scales: {
    x: {
      title: {
        display: true,
        text: 'Films'
      }
    },
    y: {
      title: {
        display: true,
        text: 'IMDB Rating'
      },
      suggestedMin: 0,
      suggestedMax: 10
    }
  }
};

const LineChart = () => {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    getAllFilms().then((res) => {
      setFilms(res.data);
    });
  }, []);

  const chartData = {
    labels: films.map((data, index) => data.title),
    datasets: [
      {
        label: 'IMDB Rating',
        data: films.map((data, index) => data.imdb),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
        elements: {
          point: {
            radius: 0
          }
        },
        animations: {
          tension: {
            duration: 1000,
            easing: 'linear',
            from: 1,
            to: 0,
            loop: true
          }
        },
      }
    ]
  };

  return (
    <div>
      <Chart type="line" options={options} data={chartData} />
    </div>
  );
}

export default LineChart;
