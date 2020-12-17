import React, { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email:null, password:null});

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/signup',{email, password});
      Router.push('/');
    }
    catch (err) {
      const errors = {other:[]};
      for (let error of err.response.data.errors) {
        if (error.field) {
          errors[error.field] = error.message;
        }
        else {
          errors.other.push(error.message);
        }
      }
      setErrors(errors);
    }
  };

  const style={
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)'
  }

  return (
    <div className="col-4" style={style}>
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email:</label>
          <input value={email} onChange={e => setEmail(e.target.value)} className="form-control"/>
          {errors.email}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control"/>
          {errors.password}
        </div>
        {errors.other}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;