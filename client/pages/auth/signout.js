import Router from 'next/router';
import axios from 'axios';
import { useEffect } from 'react';

const signout = () => {
  useEffect(async () => {
    try {
      await axios.post('/api/users/signout');
    }
    catch (err) {
      
    }
    Router.push('/');
  }, []);
  return <div>Signing out..</div>;
};

export default signout;