import Router from 'next/router';
import axios from 'axios';
import Product from '../../components/Product';

const ProductShow = ({product}) => {
  const buttonClick = async () => {
    let response;
    try {
      response = await axios.post('/api/orders', {productId: product.id});
    }
    catch {}
    if (response) {
      Router.push('/orders/[orderId]', '/orders/' + response.data.id);
    }
  };

  return (
    <div className="container">
      <Product product={product}></Product>
      <button onClick={buttonClick} className="btn btn-primary">Purchase</button>
    </div>
  );
};

ProductShow.getInitialProps = async (context, client, currentUser) => {
  const { productId } = context.query;
  const {data} = await client.get('/api/products/' + productId);
  return {product: data};
};

export default ProductShow;

