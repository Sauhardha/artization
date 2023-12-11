import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../../hooks/useAuthContext'
import HomePageArtworkDetails from './HomePageArtworkDetails'

export default function HomePageArtworks({artworks}) {
  return (
    <div
      className="flex flex-col items-center justify-center bodyFont h-auto mb-0"
    >
      <h1 className="text-2xl fading-heading uppercase">
        <span style={{ opacity: 1 }}>Recent </span>
        <span style={{ opacity: 0.8 }}>Master</span>
        <span style={{ opacity: 0.5 }}>pieces</span>
      </h1>
      <div className="flex gap-8 mb-12">
        {artworks.filter((artwork) => artwork.artwork && artwork).slice(0, 3).map(
            (artwork) =><HomePageArtworkDetails artwork={artwork} />,
          )}
      </div>
    </div>
  )
}
