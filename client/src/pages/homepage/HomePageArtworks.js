import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworkDetails from './HomePageArtworkDetails'

export default function HomePageArtworks() {
  // const [id, setId] = useState();
  const { user } = useAuthContext()
  const [artworks, setArtworks] = useState([])

  useEffect(() => {
    const fetchHottestSessions = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/artworks/sessions/hottest',
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )

        if (response.status === 200) {
          setArtworks(response.data)
        }
      } catch (e) {}
    }

    fetchHottestSessions()
  }, [])


//   console.log(filteredArtworks)
  return (
    <div
      className="flex flex-col items-center justify-center"
      style={{ fontFamily: 'Simplifica', marginTop: '3rem', marginBottom: '4rem'}}
    >
      <h1
        style={{
          fontSize: '36px',
          fontWeight: 'bold',
          backgroundImage: 'linear-gradient(90deg, #ff6f61, #6b84d4)',
          //   backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          //   color: 'transparent',
          animation: 'fade 2s infinite',
        }}
        className="fading-heading"
      >
        <span style={{ opacity: 1 }}>Today's </span>
        <span style={{ opacity: 0.8 }}>Featured </span>
        <span style={{ opacity: 0.6 }}>Master</span>
        <span style={{ opacity: 0.4 }}>pieces</span>
      </h1>
      <div className="flex gap-8 mb-14">
        {artworks.filter((artwork) => artwork.artwork && artwork).slice(0, 3).map(
            (artwork) =><HomePageArtworkDetails artwork={artwork} />,
          )}
      </div>
    </div>
  )
}
