import { useState } from 'react';
import axios from 'axios';

export default ({url, method, body, onSuccess}) => {
  const [errors, setErrors] = useState(null);
  const doRequest = () => {
    try {
      const response = await axios[method](url, body);
      if (onSuccess) {
        onSuccess();
      }
      return response.data;
    }
    catch (err) {

    }
  };
  return { doRequest, errors };
};