import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useNotification } from "../../notification/NotificationService";
import { db } from "../../services/firebase/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import { createProductsAdaptedFromFirestore } from "../../adapters/createProductAdaptedFromFirestore";
import { Container, Row, Col } from 'react-bootstrap';

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  const { showNotification } = useNotification();

  useEffect(() => {
    if (product) document.title = product.name;

    return () => {
      document.title = 'JBL LOVERS';
    };
  }, [product]);

  useEffect(() => {
    setLoading(true);

    const productDocument = doc(db, 'products', productId);

    getDoc(productDocument)
      .then(queryDocumentSnapshot => {
        const productAdapted = createProductsAdaptedFromFirestore(queryDocumentSnapshot);
        setProduct(productAdapted);
      })
      .catch(error => {
        showNotification('error', 'Existe un error');
      })
      .finally(() => {
        setLoading(false);
      });

  }, [productId]);

  if (loading) {
    return <h1>Se está cargando</h1>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <h1>Detalle de Producto</h1>
          <h1>{product?.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <ItemDetail {...product} />
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetailContainer;
