import axios from 'axios'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/request'
import {Movie} from '../typing'
import Row from '../components/Row'
import useAuth from '../hooks/useAuth'
import {useRecoilValue} from 'recoil'
import { modalState } from '../atoms/modalAtom'
import Modal from '../components/Modal'


interface Prop {
  netflixOrigins : Movie[],
  trendingNow : Movie[],
  actionMovie: Movie[],
  topRate : Movie[],
  comedyMovie: Movie[],
  horrorMovie: Movie[],
  romanceMovie: Movie[],
  documentaries: Movie[],
  latest: Movie[]
}

const Home = ({ netflixOrigins , 
                actionMovie, 
                trendingNow, 
                topRate, 
                comedyMovie, 
                horrorMovie,
                romanceMovie,
                documentaries,
               }:Prop ) => {
  const {isLoading} = useAuth()
  const showModel = useRecoilValue(modalState)
  
  if(isLoading){
    return "Loading"
  }
          
  return (
    <div className={`relative h-screen bg-gradient-to-b lg:h-[140vh] 
    ${ showModel && '!h-screen !overflow-hidden'}`} >
      <Head>
        <title>Home Madflix</title>
        <link rel="icon" href="/favicon.ico" />
       </Head> 
       <Header/>
       <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOrigin={netflixOrigins}/>
        <section className='md:space-y-20'>
        <Row title="Trending Now" movies={trendingNow} />
        <Row title="Top Rated" movies={topRate}/>
        <Row title="Action Thrillers" movies={actionMovie}/>
        {/* {My List Component} */}
        <Row title="Comedies" movies={comedyMovie}/>
        <Row title="Horror Movies" movies={horrorMovie}/>
        <Row title="Romance Movies" movies={romanceMovie}/>
        <Row title="Documentaries" movies={documentaries}/>
        </section>
       </main>
       {showModel &&  <Modal/>}
    </div>
  )
}

export default Home

export const getServerSideProps = async () => {
   
  const [
    netflixOrigins,
    trendingNow,
    topRate,
    actionMovie,
    comedyMovie,
    horrorMovie,
    romanceMovie,
    documentaries,
  ] = await Promise.all([
    axios.get(requests.fetchNetflixOriginals).then((res)=> res.data),
    axios.get(requests.fetchTrending).then((res)=> res.data),
    axios.get(requests.fetchTopRated).then((res)=> res.data),
    axios.get(requests.fetchActionMovies).then((res)=> res.data),
    axios.get(requests.fetchComedyMovies).then((res)=> res.data),
    axios.get(requests.fetchHorrorMovies).then((res)=> res.data),
    axios.get(requests.fetchRomanceMovies).then((res)=> res.data),
    axios.get(requests.fetchDocumentaries).then((res)=> res.data),
  ])
  return{
    props:{
      netflixOrigins: netflixOrigins.results,
      trendingNow: trendingNow.results,
      topRate: topRate.results,
      actionMovie: actionMovie.results,
      comedyMovie: comedyMovie.results,
      horrorMovie: horrorMovie.results,
      romanceMovie: romanceMovie.results,
      documentaries: documentaries.results,
    }
  }
}


