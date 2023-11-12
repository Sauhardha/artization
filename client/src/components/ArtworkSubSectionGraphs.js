import '../styles/index.css'
import { useEffect, useState } from 'react'
import { useArtworksContext } from '../hooks/useArtworksContext'
import { useAuthContext } from '../hooks/useAuthContext'
import axios from 'axios'
import {
  VictoryChart,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryArea,
  VictoryGroup,
  VictoryAxis,
  VictoryLegend,
  VictoryStack,
  VictoryBar,
  VictoryContainer,
} from 'victory'
import { useParams } from 'react-router-dom'

const ArtworkSubSectionGraphs = ({ artwork }) => {
  const { user } = useAuthContext()

  const [data, setData] = useState([])
  const [state, setState] = useState([])
  const [maxima, setMaxima] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const res = axios
      .get(`http://localhost:8080/api/artworks/${id}/sessions`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setMaxima(getMaxima(res.data.slice(0, 2)))
        setData(processData(res.data.slice(0, 2)))
        setState(res.data)
      })
      .catch((err) => console.log(err))
  }, [])

  const getMaxima = (data) => {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key])
      return memo
    }, {})
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key])
      return memo
    }, {})
  }

  const processData = (data) => {
    const maxByGroup = getMaxima(data)
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] }
      })
    }
    return data.map((datum) => makeDataArray(datum))
  }
  const colorScale = ['#FF5733', '#3366FF', '#33FF33', '#FFD633', '#999999']

  const [dataa, setDataa] = useState(getData())

  useEffect(() => {
    const interval = setInterval(() => {
      setDataa(getData())
    }, 4000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min
  }

  function getData() {
    return Array.from({ length: 7 }, () => {
      return [
        { x: 1, y: getRandomNumber(1, 5) },
        { x: 2, y: getRandomNumber(1, 10) },
        { x: 3, y: getRandomNumber(2, 10) },
        { x: 4, y: getRandomNumber(2, 10) },
        { x: 5, y: getRandomNumber(2, 15) },
      ]
    })
  }

  return (
    <div className="flex flex-col justify-between text-left rounded-lg md:w-1/2">
      <VictoryChart polar domain={{ y: [0, 1] }} style={{ color: 'white' }}>
        <VictoryGroup
          colorScale={['gold', 'orange', 'tomato']}
          style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
        >
          {data.map((dataPoints, i) => (
            <VictoryArea key={i} data={dataPoints} />
          ))}
        </VictoryGroup>
        {Object.keys(maxima).map((key, i) => (
          <VictoryPolarAxis
            key={i}
            dependentAxis
            style={{
              axisLabel: { padding: 10, fill: 'white' },
              axis: { stroke: 'none' },
              grid: { stroke: 'grey', strokeWidth: 0.25, opacity: 0.5 },
            }}
            tickLabelComponent={
              <VictoryLabel
                labelPlacement="vertical"
                style={{ fill: '#9fab93' }}
              />
            }
            labelPlacement="perpendicular"
            axisValue={i + 1}
            label={key}
            tickFormat={(t) => Math.ceil(t * maxima[key])}
            tickValues={[0.25, 0.5, 0.75]}
          />
        ))}
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickFormat={() => ''}
          style={{
            axis: { stroke: 'none' },
            grid: { stroke: 'grey', opacity: 0.5 },
          }}
        />
      </VictoryChart>

      {/* <VictoryChart animate={{ duration: 1000 }} style={{ fill: 'white' }}>
        <VictoryStack colorScale={'blue'} style={{ fill: 'white' }}>
          {dataa.map((dataPoints, i) => {
            return (
              <VictoryArea
                key={i}
                data={dataPoints}
                interpolation={'basis'}
                style={{ fill: 'white' }}
              />
            )
          })}
        </VictoryStack>
      </VictoryChart> */}
    </div>
  )
}
export default ArtworkSubSectionGraphs
