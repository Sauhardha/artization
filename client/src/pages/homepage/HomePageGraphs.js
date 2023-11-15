import React, { useState, useEffect } from 'react'

import { VictoryChart, VictoryBar, Bar, VictoryTheme } from 'victory'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'

const HomePageGraphs = () => {
  const { user } = useAuthContext()
  const [state, setState] = useState({})

  const [chartData, setChartData] = useState({
    clicked: false,
    style: {
      data: { fill: 'tomato' },
    },
    data: [],
  })

  useEffect(() => {
    const fetchHottestSessions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/artworks/sessions/homepage',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )

        if (response.status === 200) {
          setState(response.data)
          const formattedData = mapResponseToChartData(response.data?.sessions)
          setChartData({
            ...chartData,
            data: formattedData,
          })
        }
      } catch (e) {
        console.error('Error fetching data:', e)
      }
    }

    fetchHottestSessions()
  }, [])

  const mapResponseToChartData = (responseData) => {
    return [
      { x: 'Happy', y: responseData.Happy },
      { x: 'Sad', y: responseData.Sad },
      { x: 'Excited', y: responseData.Excited },
      { x: 'Surprise', y: responseData.Surprise },
      { x: 'Neutral', y: responseData.Neutral },
    ]
  }

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
    <div className="flex items-center mx-40 mb-16 text-black shadow-xl drop-shadow rounded-xl">
      <div style={{ minWidth: '50%' }} className="w-2/3">
        <VictoryChart
          theme={VictoryTheme.material}
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
     
        <div className="flex flex-col w-1/3 pt-8 ">
          <h1 className="mb-2 text-lg font-bold">
            The most viewed painting today
          </h1>
          <p className="mb-2 text-xl font-semibold">Painting: {state.artwork ? state.artwork.title: 'Anonymous'}</p>
          <p className="text-lg text-gray-700">by {state.user ? state.user.firstName : 'Anonymous'}</p>
        </div>
    </div>
  )
}

export default HomePageGraphs
