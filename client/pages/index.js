import buildClient from '../api/build-client';
import { useState, useEffect } from 'react';
import Product from '../components/Product';

const Index = ({currentUser, products}) => {
  const style={
    leftMargin: 'auto',
    rightMargin: 'auto',
    marginTop: '3em'
  } 
  return (
    <div className="container" >
      <div className="row row-cols-1 row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4" style={style}>
        {products && products.map(item => {
          return (
            <div class="col"> <Product product={item} key={item.id}></Product> </div>
          );
        })}
      </div>
    </div>
  );
};

Index.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/products');
  return {products: data};
};

export default Index; 