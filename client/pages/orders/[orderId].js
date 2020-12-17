import axios from 'axios';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const OrderShow = ({order, currentUser}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [errors, setErrors] = useState('');
  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft/1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    }
  }, []);
  
  if (timeLeft < 0) {
    return <div>Order expired</div>;
  }

  return (
    <div>
      <div>You have {timeLeft} seconds to complete this purchase.</div>
      <StripeCheckout
        token={async ({id}) => {
          try{
            const response = await axios.post('/api/payments', {orderId: order.id, token: id});
            Router.push('/orders');
          }
          catch {
            setErrors('Purchase failed!');
          }
        }}
        stripeKey="pk_test_51HywLfHNHYpHUJpkLayXHlo5TFixZ0JCDeQdJg6CbQqFrIzWHjKM5WU8543zA2THxkheT7Ob1jz1vcbYCfOorFpc00tfmyMDMq"
        amount={order.product.price*100}
        email={currentUser.email}
      >
      </StripeCheckout>
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client, currentUser) => {
  const {orderId} = context.query;
  const {data} = await client.get('/api/orders/' + orderId);
  return {order: data, currentUser};
}

export default OrderShow;