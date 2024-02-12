import { Row, Col } from 'react-bootstrap';
import Item from "../Item/Item";
import './ItemList.css'; // Importamos el archivo de estilos CSS

const ItemList = ({ products }) => {
  return (
    <Row xs={1} sm={2} md={3} lg={3} xl={3} className="justify-content-center">
      {products.map(product => (
        <Col key={product.id} className="mb-4">
          <Item 
            id={product.id} 
            name={product.name} 
            img={product.img} 
            category={product.category} 
            price={product.price} 
          />
        </Col>
      ))}
    </Row>
  );
};

export default ItemList;
