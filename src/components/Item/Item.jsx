import { Link } from "react-router-dom"

const Item = ({ id, name, img, category, price}) => {
    return (
        <div>
            <h3>{name}</h3>
            <img src={img} style={{ width: 100 }}/>
            <p>Categoria: {category}</p>
            <h4>USD{price}</h4>
            <Link to={`/detail/${id}`}>Detalle de Producto</Link>
        </div>  
    )
}

export default Item
