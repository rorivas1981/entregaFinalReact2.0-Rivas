export const createProductsAdaptedFromFirestore = (doc) => {
    const fields = doc.data()

    return {
        id: doc.id,
        name: fields.name,
        img: fields.img,
        category: fields.category,
        price: fields.price,
        stock: fields.stock,
        description: fields.description,
    }


}