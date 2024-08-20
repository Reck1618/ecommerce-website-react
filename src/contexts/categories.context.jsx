import { createContext, useState, useEffect } from "react";
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


// Actual value
export const CategoriesContext = createContext({
    products: {},
});


// Provider
export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState([]);

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap  = await getCategoriesAndDocuments('categories');
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
    }
    , []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>
    );
};