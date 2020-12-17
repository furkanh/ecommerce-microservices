import axios from "axios";
import Router from "next/router";
import { useEffect, useState } from "react";

const NewProduct = ({currentUser}) => {
  useEffect(() => {
    if (!currentUser) {
      Router.push('/auth/signin');
    }
  }, []);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post('/api/products', {title, price: parseFloat(price)});
    Router.push('/');
  }
  return (
    <div>
      <h1>Create a Product</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} onBlur={onBlur} className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

NewProduct.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default NewProduct;