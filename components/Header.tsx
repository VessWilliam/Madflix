import {BellIcon, SearchIcon} from '@heroicons/react/solid';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image'

function Header(){
   const [isScroll, setisScroll] = useState(false)

   useEffect(() => {
     const handleScroll =()=>{
         (window.scrollY > 0) ? setisScroll(true) : setisScroll(false)} 
    
          window.addEventListener("scroll" , handleScroll)       
         
          return () => window.removeEventListener("scroll",handleScroll)
   }, [])

  return(
  <header className={`${isScroll && 'bg-[#141414]'}`}>
  <div className="flex items-center space-x-2 md:space-x-10 ">
   <div className="Logo">
      Madflix
      </div>
      <ul className="hidden space-x-4 md:flex">
      <li className="headerLink">Home</li>
      <li className="headerLink">TV Show</li>
      <li className="headerLink">Movies</li>
      <li className="headerLink">New & Popular</li>
      <li className="headerLink">My list</li>
      </ul>
      </div>
 
     <div className="flex items-center space-x-4 text-sm font-light"> 
       <SearchIcon className="searchIconSize"/>
       <p className="hidden lg:inline">Kids</p>
       <BellIcon className="bellIconSize"/>
       <Link href="/account">
        <div className='relative space-x-2 flex items-center'>
        <Image src='/fox.jpg' width={70} height={70} 
        layout="fixed" className="rounded-full"  />      
        </div>
       </Link>
     </div>
 </header>
 ) 
}

export default Header