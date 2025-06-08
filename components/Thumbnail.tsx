import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { modalState,movieState } from '../atoms/modalAtom';
import{ Movie } from '../types/typing';


interface Props{
  movie: Movie
}

function Thumnail( {movie}: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setcurrentMovie] = useRecoilState(movieState)

  return (
    <div
    onClick={()=>{
      setcurrentMovie(movie)
      setShowModal(true)
    }} 
    className='relative h-28 min-w-[180px] cursor-pointer
       transition duration-200 ease-out md:h-36 md:min-w-[260px]
       md:hover:scale-105'>
      <Image 
       src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
       }`}
       className='round-sm object-cover md:rounded' 
       layout='fill'/>
    </div>
  )
}

export default Thumnail;