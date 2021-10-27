import {useState, createContext} from 'react';


export const AuthContext = createContext({});


function AuthProvider({ children }){

    const [bearer, setBearer] = useState('')
    
    

    return(
        <AuthContext.Provider value={{ bearer, setBearer }}>

            {children}

        </AuthContext.Provider>

    )

}


export default AuthProvider;