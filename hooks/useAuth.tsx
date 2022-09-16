import { useState,
         createContext,
         useContext, 
         useEffect,
         useMemo } from "react"
import {createUserWithEmailAndPassword,
         onAuthStateChanged,
          signInWithEmailAndPassword,
          signOut,
          User
       } from 'firebase/auth'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

interface IAuth{
    user: User | null
    signUp: (email: string , password:string) => Promise<void>
    signIn: (email: string , password:string) => Promise<void>
    logout: () => Promise<void>
    error: string | null;
    isLoading: boolean    
} 

const AuthContext = createContext<IAuth>({
   user : null,
   signUp:async () => {},
   signIn:async () => {},
   logout:async () => {},
   error:null,
   isLoading:false
})
 

interface AuthProviderProps{
    children: React.ReactNode
}


export const AuthProvider = ({ children }: AuthProviderProps) => {
 
 const [isLoading, setisLoading] = useState(false)   
 const [user, setUser] = useState<User | null>(null)
 const [initialLoding, setinitialLoding] = useState(true)
 const [error, setError] = useState(null)
 const router = useRouter()

useEffect(()=>
    onAuthStateChanged(auth,(user)=>{
      
        if(user){
            setUser(user)
            setisLoading(false)
        }
        else{
            setUser(null)
            setisLoading(true)
            router.push('/Login')
        }
       
        setinitialLoding(false)

    })
,[auth])

 const signUp = async (email:string, password:string) => {

    setisLoading(true)

    await createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>
    {setUser(userCredential.user)
        router.push("/")
        setisLoading(false)}).
    catch((error) => alert(error.message)).
    finally(() => setisLoading(false))
}

 const signIn = async (email:string, password:string) => {

    setisLoading(true)

    await signInWithEmailAndPassword(auth,email,password).then((userCredential)=>
    {setUser(userCredential.user)
        router.push("/")
        setisLoading(false)}).
    catch((error) => alert(error.message)).
    finally(() => setisLoading(false))
 }

const logout = async () => {
    setisLoading(true)

    signOut(auth).then(()=>{
        setUser(null)
    }).catch((error) => alert(error.message))
    .finally(() => setisLoading(false))
} 

const memoValue = useMemo(() => ({
    user,
    signUp,
    signIn,
    isLoading,
    logout,
    error
}),[user,isLoading])

  return( 
  <AuthContext.Provider value={memoValue}>
  {!initialLoding && children}
  </AuthContext.Provider> 
  )
}

export default function useAuth(){
    return useContext(AuthContext)
}