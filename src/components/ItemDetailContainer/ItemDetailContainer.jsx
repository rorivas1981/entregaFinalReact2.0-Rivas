import { useState, useEffect } from "react";
import { getProductById } from "../../asyncMock";
import { useParams } from "react-router-dom";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  const { productId } = useParams();

  useEffect(() => {
    if (product) document.title = product.name;

    return () => {
      document.title = 'JBL LOVERS';
    };
  }, [product]);

  useEffect(() => {
    setLoading(true);
    getProductById(productId)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [productId]);

  if (loading) {
    return <h1>Se está cargando</h1>;
  }

  return (
    <div>
      <h1>Detalle</h1>
      <h1>{product?.name}</h1>
      <ItemDetail {...product}/>
    </div>
  );
};

export default ItemDetailContainer;
