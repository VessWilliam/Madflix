import Image from "next/image"
import { useEffect, useState } from "react"
import { baseUrl } from "../constants/movie"
import {Movie} from '../types/typing'
import {FaPlay} from 'react-icons/fa'
import { InformationCircleIcon } from "@heroicons/react/solid"
import { modalState, movieState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"

interface Props {
  netflixOrigin: Movie[]
}

function Banner({netflixOrigin} : Props){
  
  const [movie, setmovie] = useState<Movie | null>(null)
  const [showModel, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)

  useEffect(() => {

    setmovie(netflixOrigin[Math.floor(Math.random() * netflixOrigin.length )])

  }, [netflixOrigin])
  


  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 
        lg:h-[65vh] lg:justify-end lg:pb-12 ">
        <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
            <Image src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
            layout='fill' 
            objectFit="cover"/>
        </div>
        <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl">
          {movie?.title || movie?.name || movie?.ori_name}</h1>
        <p className="max-w-xs text-shadow-md text-xs md:max-w-lg 
            md:text-lg lg:max-w-2xl lg:text-2xl">
          {movie?.overview}
        </p>

        <div className="flex space-x-3">
         <button className="bannerButton bg-white text-black">
        <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7"/> 
        Play
        </button>

         <button  
         className="bannerButton bg-[gray]/70"
         onClick={()=>{
           setCurrentMovie(movie)
           setShowModal(true)
         }}>
           More info 
         <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8"/></button>
        </div>
    </div>
  )
}

export default Banner