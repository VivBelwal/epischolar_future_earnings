import { createContext, useState } from "react";
import savings from "../data/Savings/Branch_wise/savings.json";
export const DataContext = createContext();


export const DataContextProvider = ({children}) =>{

    const [savingsData, setSavingsData] = useState(savings);

    const changeData = (data) =>{
        setSavingsData(data)
}


    return <DataContext.Provider value={{savingsData, changeData}}>{children}</DataContext.Provider>
}