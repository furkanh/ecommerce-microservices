

const OrderIndex = ({orders}) => {
  return (
    <div>
      <ul>
        {orders.map(order => {
          return (<li key={order.id}>
            {order.product.title} - {order.status}
          </li>);
        })}
      </ul>
    </div>
  );
}

OrderIndex.getInitialProps = async (context, client, currentUser) => {
  const {data} = await client.get('/api/orders');
  return {orders: data};
};

export default OrderIndex;