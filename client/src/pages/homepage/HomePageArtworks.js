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

  return (
    <div
      className="flex flex-col items-center justify-center bodyFont"
    >
      <h1 className="fading-heading text-2xl">
        <span style={{ opacity: 1 }}>Recent </span>
        <span style={{ opacity: 0.8 }}>Master</span>
        <span style={{ opacity: 0.5 }}>pieces</span>
      </h1>
      <div className="flex gap-8">
        {artworks.filter((artwork) => artwork.artwork && artwork).slice(0, 3).map(
            (artwork) =><HomePageArtworkDetails artwork={artwork} />,
          )}
      </div>
    </div>
  )
}
