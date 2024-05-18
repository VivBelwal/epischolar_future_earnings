import { createContext, useState } from "react";

export const SelectContext = createContext();


export const SelectContextProvider = ({children}) =>{

    const [selectData, setSelectData] = useState({
        loan_amount: 50,
        annual_salary: 360000,
        Branch : 'Aerospace Engineering',
        Country: ['Australia'],
        College_Ranking: ['51-100'],
        Currency: "USD (United States)"


    });

    const changeSelectData = (data) =>{
        setSelectData(data)
}


    return <SelectContext.Provider value={{selectData, changeSelectData}}>{children}</SelectContext.Provider>
}