const products = [
    {
        id: '1',
        name: 'JBL Wave Buds',
        price: 45,
        category: 'auricular',
        img: 'https://uy.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw77340295/1.JBL_Wave_Vibe_%20Buds_Product%20Image_Hero_Black.png?sw=537&sfrm=png',
        stock: 25,
    },
    { id: '2', name: 'JBL Flip6', price: 99, category: 'parlante', img: 'https://uy.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwfff402c9/2_JBL_FLIP6_3_4_RIGHT_BLACK_30195_x1.png?sw=537&sfrm=png', stock: 12 },
    { id: '3', name: 'PartyBox710', price: 699, category: 'partybox', img: 'https://uy.jbl.com/dw/image/v2/AAUJ_PRD/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw3f59a577/1_JBL_PARTYBOX_710_HERO_0031_x8.png?sw=537&sfrm=png', stock: 9 }
]

export const getProducts = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products)
        }, 1000)
    })
}

export const getProductsByCategory = (categoryId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.filter(prod => prod.category === categoryId))
        }, 1000)
    })
}

export const getProductById = (productId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(products.find(prod => prod.id === productId))
        }, 1000)
    })
}