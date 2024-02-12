import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./item.css"

const Item = ({ id, name, img, category, price }) => {
  return (
    <div className="item-container"> {}
      <h3>{name}</h3>
      <img src={img} alt={name} className="item-image" /> {}
      <p>Categoria: {category}</p>
      <h4>USD {price}</h4>
      {}
      <Link to={`/detail/${id}`}><Button variant="danger" style={{ backgroundColor: 'orangered', borderColor: 'orangered', color: 'white' }}>Detalle de Producto</Button></Link>
    </div>
  );
};

export default Item;
