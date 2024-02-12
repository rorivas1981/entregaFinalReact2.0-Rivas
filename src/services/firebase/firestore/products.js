import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { createProductsAdaptedFromFirestore } from "../../../adapters/createProductAdaptedFromFirestore";


export const getProducts = (categoryId) => {
    
    const producsCollection = categoryId
        ? query(collection(db, 'products'), where('category', '==', categoryId))
        : collection(db, 'products');

    return getDocs(producsCollection)
        .then(querySnapshot => {
            const productsAdapted = querySnapshot.docs.map(doc => {
                   return createProductsAdaptedFromFirestore(doc)
            });
            return productsAdapted
        })
        .catch(error => {
            return error
        })
}

export const getProductsById = () => {
    
}