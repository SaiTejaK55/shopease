import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if(storedUser){
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (username, password) => {
        if (username === "Saiteja" && password === "12345") {
            const loggedUser = {username};
            setUser(loggedUser);
            localStorage.setItem("user", JSON.stringify(loggedUser));
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}} >
            {children}
        </AuthContext.Provider>
    )
}