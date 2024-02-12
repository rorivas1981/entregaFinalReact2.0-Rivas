import { Link } from "react-router-dom";
import "./Item.css"; // Importa los estilos CSS

const Item = ({ id, name, img, category, price }) => {
  return (
    <div className="item-container"> {/* Agrega la clase del contenedor */}
      <h3>{name}</h3>
      <img src={img} alt={name} className="item-image" /> {/* Agrega la clase para la imagen */}
      <p>Categoria: {category}</p>
      <h4>USD{price}</h4>
      <Link to={`/detail/${id}`}>Detalle de Producto</Link>
    </div>
  );
};

export default Item;
