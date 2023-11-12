import '../styles/index.css'
import { useArtworksContext } from '../hooks/useArtworksContext'
import { useAuthContext } from '../hooks/useAuthContext'

const ArtworkSubSectionDetails = ({ artwork }) => {
  const { dispatch } = useArtworksContext()
  const { user } = useAuthContext()

  return (
    <div className="flex flex-col justify-between p-6 text-left align-middle rounded-lg md:w-1/2 md:pl-8">
      <h1 className="my-6 font-bold md:text-4xl xt-xl -4 headFont">
        {artwork.title}
      </h1>
      <div
        className="flex flex-col justify-between w-auto text-left rounded-lg shadow-lg artwork-details bg-zinc-800 shadow-slate-950 hover:shadow-slate-700"
        style={{ width: '40%' }}
      >
        <img src={`http://localhost:8080${artwork.imageURL}`} alt="artwork" />
      </div>
      <div  className="my-6">
        <h2 className="my-2 md:text-xl headFont">Description: </h2>
        <span className="text-sm md:w-3/4 md:pl-8">{artwork.desc}</span>
      </div>
    </div>
  )
}
export default ArtworkSubSectionDetails
