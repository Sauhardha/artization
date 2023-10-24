import React from 'react'

export default function HomePageArtworkDetails({ artwork }) {
  console.log('artworling', artwork)
  return (
    <div>
      {artwork && (
        <div
          className="flex flex-col justify-between w-auto gap-3 p-6 text-left rounded-lg"
          style={{ height: '5rem' }}
        >
         
          <span className="text-sm headFont c1">{artwork.stat}</span>
          <img
            src={`http://localhost:8081${artwork.imageURL}`}
            alt="artwork"
            className="h-40 mt-auto"
          />
          <div className='flex flex-col items-center justify-center'>
            <h4>{artwork.artwork.title}</h4>
            <h4>by</h4>
            <h4>Jason</h4>
          </div>
        </div>
      )}
    </div>
  )
}
