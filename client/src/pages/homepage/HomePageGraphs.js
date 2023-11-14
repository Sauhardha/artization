import React, { useState, useEffect } from 'react'
//import { VictoryChart, VictoryTheme, VictoryZoomContainer, VictoryScatter } from 'victory'

// export default function HomePageGraphs() {
//   const [data, setData] = useState(getScatterData())

//   function getScatterData() {
//     return Array.from({ length: 50 }, (_, index) => ({
//       x: random(1, 50),
//       y: random(10, 90),
//       size: random(8) + 3,
//     }))
//   }

//   function random(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min
//   }

//   useEffect(() => {
//     setData(getScatterData())
//   }, [])

//   return (
//     <div className="mx-40" style={{width: '31%'}}>
//       <div className='' >
//         <VictoryChart
//           domain={{ y: [0, 100] }}
//           containerComponent={
//             <VictoryZoomContainer zoomDomain={{ x: [5, 35], y: [0, 100] }} />
//           }

//         >
//           <VictoryScatter
//             data={data}
//             style={{
//               data: {
//                 opacity: ({ datum }) => (datum.y % 5 === 0 ? 1 : 0.7),
//                 fill: ({ datum }) => (datum.y % 5 === 0 ? 'tomato' : 'black'),
//               },
//             }}
//           />
//         </VictoryChart>
//       </div>
//     </div>
//   )
// }

import { VictoryChart, VictoryBar, Bar, VictoryTheme } from 'victory'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'


const HomePageGraphs = () => {
  const { user } = useAuthContext()

  const [chartData, setChartData] = useState({
    clicked: false,
    style: {
      data: { fill: 'tomato' },
    },
    data: []
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
        );

        if (response.status === 200) {
          const formattedData = mapResponseToChartData(response.data);
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
    <div className="flex items-center mx-40 text-black drop-shadow shadow-xl rounded-xl mb-16">
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
        <h1 className="mb-2 text-lg font-bold uppercase tracking-wide">
          The most viewed painting today
        </h1>
        <p className="mb-2 text-xl font-semibold">"Sunset"</p>
        <p className="text-lg text-gray-700">by Sundah</p>
      </div>
    </div>
  )
}

export default HomePageGraphs
