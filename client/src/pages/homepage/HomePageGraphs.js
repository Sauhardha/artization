import React, { useState, useEffect } from 'react'
import { VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryZoomContainer,
  VictoryScatter,
  VictoryArea } from 'victory';

export default function HomePageGraphs() {
  const [data, setData] = useState(getScatterData())
  const white = "#ffffff";
  const chartTheme = {
    axis: {
      style: {
        tickLabels: {
          // this changed the color of numbers to white
          fill: 'white',
          
        },
        axis: {
          stroke: 'white',
         
        },
        grid: {
          stroke: 'transparent'
        }
      },
    },
  };

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
    <div className="mx-auto " style={{width: '25%'}}>
      <div className='' >
        <VictoryChart
          domainPadding={{x: [0, 0]}}
          theme= {chartTheme}
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
                fill: ({ datum }) => (datum.y % 5 === 0 ? 'tomato' : 'cyan'),
              },
            }}
          />
          
        </VictoryChart>
      </div>
    </div>
  )
}
