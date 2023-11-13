import React from 'react'
import '../../styles/index.css';
import ArtworkDetails from '../../components/ArtworkDetails'
import { useArtworksContext } from '../../hooks/useArtworksContext'
import { Link } from 'react-router-dom';

export default function HomePageArtworkDetails({ artwork }) {
  console.log(artwork)
  return (
    <div>
      {artwork && (
        <div
          className="flex flex-col justify-between w-auto gap-3 p-6 text-left rounded-lg"
          style={{ height: '5rem' }}
        >
         
          <span className="text-sm headFont c1">{artwork.stat}</span>
          <img
            src={`http://localhost:8080${artwork.imageURL}`}
            alt="artwork"
            className="h-40 mt-auto"
          />
          <div className='flex flex-col items-center justify-center'>
            <h4>{artwork.artwork.title}</h4>
            <h4>by</h4>
            {artwork.artist ? <h4> {artwork.artist.firstName } {artwork.artist.lastName }</h4>: <h4> Someone</h4>}
          </div>
        </div>
      )}
    </div>
  )
}
