import { Children, createContext } from "react";

interface authContextIF {
    uid: string | null,
}
export const authContext = createContext<authContextIF | null>(null);


export const AuthContextProvider = () => {
    return (
        <authContext.Provider>
            {Children}
        </authContext.Provider>
    )
}