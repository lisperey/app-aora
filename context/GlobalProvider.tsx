import { createContext, useContext, useState, useEffect} from 'react';
import { getCurrentUser } from './../lib/appwrite';

const GlobalContext = createContext({});
export  const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }:any) =>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
        .then((res: any)=>{
            if(res){
                setIsLoggedIn(true);
                setUser(res);
                return;
            }
            setIsLoggedIn(false);
            setUser(null); 
            return;

        })
        .catch((error: any) => {
            console.log(error);
        })
        .finally(() =>{
            setIsLoading(false);
        });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;