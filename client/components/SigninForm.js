import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import axios from 'axios';
import ReCAPTCHA from "react-google-recaptcha";

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({email:null, password:null});
  const [token, setToken] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/api/users/signin',{email, password});
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

  const onCaptchaConfirm = (token) => {
    setToken(token);
  }

  const style={
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
}

  return (
    <div className="col-4" style={style}>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
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
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onCaptchaConfirm}
        />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default SigninForm;