import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import Link from 'next/link';

const Product = ({product}) => {
  return (
    <Link href={'/products/' + product.id}>
      <div className="card" style={{width: '16rem', height: '16rem', textAlign: 'center'}}>
        <div className="card-body">
          <h5>{product.title}</h5>
          <img src="" alt="" style={{marginLeft: "auto", marginRight: "auto", width: '10rem', height: '10rem'}}></img>
          <p>{product.price} €</p>
        </div>
      </div>
    </Link>
  );
};

export default Product;