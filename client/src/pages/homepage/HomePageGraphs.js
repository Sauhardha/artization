import React, { useState, useEffect } from 'react'
import { VictoryChart, VictoryZoomContainer, VictoryScatter } from 'victory'

export default function HomePageGraphs() {
  const [data, setData] = useState(getScatterData())

  function getScatterData() {
    return Array.from({ length: 50 }, (_, index) => ({
      x: random(1, 50),
      y: random(10, 90),
      size: random(8) + 3,
    }))
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  useEffect(() => {
    setData(getScatterData())
  }, [])

  return (
    <div className="mx-40" style={{width: '31%'}}>
      <div className='' >
        <VictoryChart
          domain={{ y: [0, 100] }}
          containerComponent={
            <VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />
          }
          
        >
          <VictoryScatter
            data={data}
            style={{
              data: {
                opacity: ({ datum }) => (datum.y % 5 === 0 ? 1 : 0.7),
                fill: ({ datum }) => (datum.y % 5 === 0 ? 'tomato' : 'black'),
              },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  )
}
