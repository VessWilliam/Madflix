import { PlusIcon, ThumbUpIcon, VolumeUpIcon, XIcon ,VolumeOffIcon  } from '@heroicons/react/outline'
import MuiModal from '@mui/material/Modal'
import {useRecoilState} from 'recoil'
import {modalState, movieState} from '../atoms/modalAtom'
import {useState , useEffect} from 'react'
import axios from 'axios'
import {Element,Genre} from '../types/typing'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'


function Modal() {

  const [showModel,setShowModel] = useRecoilState(modalState)
  const [movie, setMovie] = useRecoilState(movieState)
  const [trailer , setTrailer] = useState("")
  const [genres, setGenres] = useState<Genre[]>()
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if(!movie) return
    
    async function fetchMovie(){
       const dataTrailer = await axios.get(
        `https://api.themoviedb.org/3/${movie?.media_type === 
        'tv' ? 'tv' : 'movie'}/${movie?.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
     ).then((res) => res.data)
     .catch((erro) =>{console.log(erro.message)})

    console.log(dataTrailer)

       if(dataTrailer?.videos)
        {
          const index = dataTrailer.videos.results.findIndex( 
            (element: Element) => element.type === "Trailer")
          
          setTrailer(dataTrailer.videos?.results[index]?.key)
          console.log(dataTrailer.videos?.results[index]?.key)
        }
        dataTrailer?.genres && setGenres(dataTrailer.genres)
   } 

   fetchMovie()

  }, [movie])
  
  const handleClose = () =>{
      setShowModel(false)
  }

 console.log(trailer)
  return (
   <MuiModal open={showModel} onClose={handleClose} 
   className='fixex !top-7 left-0 right-0 z-50 mx-auto 
   w-full max-w-5xl overflow-hidden overflow-y-scroll scrollbar-hide'>
    <>
      <button onClick={handleClose}      
        className='modalButton absolute right-5 top-5 !z-40 h-9 w-9 
        border-none bg-[#181818] hover:bg-[#181818]'>
        <XIcon className='h-6 w-6'/>

      </button>
     
      <div className='relative pt-[56.25%]'>
        <ReactPlayer
        url={`https://www.youtube.com/watch?v=${trailer}`}
        width='100%'
        height='100%'
        style={{position:'absolute' , top:'0' , left: '0'}}
        playing
        muted={muted}
        />
        <div className='absolute bottom-10 flex w-full
            items-center justify-between px-10'>
          <div className='flex space-x-2'>
             <button className='flex items-center gap-x-2 rounded
              bg-white px-8 text-xl font-bold text-black 
               transition hover:bg-[#e6e6e6]'>

              <FaPlay className='h-7 w-7 text-black'/>
              Play
             </button>
            
            <button className='modalButton'>
              <PlusIcon className='h-7 w-7'/>
            </button>
           
            <button className='modalButton'> 
              <ThumbUpIcon className='h-7 w-7'/>
            </button>

          </div>
          <button className='modalButton' 
          onClick={() => setMuted(!muted)}>
              {muted ? 
              <VolumeOffIcon className='h-6 w-6'/> 
              : <VolumeUpIcon className='h-6 w-6'/>}               
          </button>
        </div>
      </div>

      <div className='flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8'>
        <div className='space-y-6 text-lg'>
          <div className='flex items-center space-x-2 text-sm'>
            <p className='font-semibold text-green-400'>
              {movie!.vote_average * 10}% Match
            </p>
            <p className='font-light'>
              {movie?.release_date || movie?.first_air_date}
            </p>
            <div className='flex h-4 items-center justify-center 
            rounded border border-white/40 px-1.5 text-xs' >
            HD
            </div>
          </div>

          <div className='flex flex-col gap-x-10 gap-y-4 font-light md:flex-row'>
            <p className='w-5/6'>{movie?.overview}</p>
            <div className='flex flex-col space-y-3 text-sm'>
              <div>
                <span className='text-[gray]'>Genres: </span>
                {genres?.map((genre) => genre.name).join(", ") }
              </div>
              
              <div>
                <span className='text-[gray]'>Original language: </span>
                {movie?.ori_language}
              </div>

              <div>
                <span className='text-[gray]'>Total votes: </span>
                {movie?.vote_count}  
              </div>  

            </div>
          </div>
      </div>
  </div>
</>
</MuiModal>
)}

export default Modal