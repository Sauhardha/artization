import React, { useState, useEffect,  } from 'react'
import { useParams } from 'react-router-dom'
import { VictoryChart, VictoryBar, Bar } from 'victory'
import axios from 'axios'
import { useAuthContext } from '../hooks/useAuthContext'


export default function SubSectionGraph2(){
  const { user } = useAuthContext()
  const { id } = useParams()

  const [chartData, setChartData] = useState({
    clicked: false,
    style: {
      data: { fill: 'tomato' },
    },
    data: []
  })

  console.log('params', id)

  useEffect(() => {
    const fetchHottestSessions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/artworks/${id}/sessions`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );

        if (response.status === 200) {
          const formattedData = mapResponseToChartData(response.data[0]);
          setChartData({
            ...chartData,
            data: formattedData,
          });
        }
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };

    fetchHottestSessions();
  }, []);


  const mapResponseToChartData = (responseData) => {
    return [
      { x: 'Happy', y: responseData.Happy },
      { x: 'Sad', y: responseData.Sad },
      { x: 'Excited', y: responseData.Excited },
      { x: 'Surprise', y: responseData.Surprise },
      { x: 'Neutral', y: responseData.Neutral },
    ];
  };

  const handleMouseOver = () => {
    const fillColor = chartData.clicked ? 'blue' : 'tomato'
    const clicked = !chartData.clicked
    setChartData({
      ...chartData,
      clicked,
      style: {
        data: { fill: fillColor },
      },
    })
  }

  return (
    <div className="items-center mx-0 text-black" style={{width: '100%'}} >
      <div style={{ minWidth: '100%' }} >
        <VictoryChart
          height={200}
          width={400}
          domainPadding={{ x: 30, y: [0, 20] }}
        >
          <VictoryBar
            style={chartData.style}
            data={chartData.data}
            dataComponent={<Bar events={{ onMouseOver: handleMouseOver }} />}
          />
        </VictoryChart>
      </div>
    </div>
  )
}


