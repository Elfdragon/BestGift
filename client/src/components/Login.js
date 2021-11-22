import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import api from '../apis/server';
import history from '../history';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await api.post('/users/login', { email, password });
      
      props.isAuth(response.data)
      history.push("/");

    } catch(error){
      setError(true);
      console.log(error)
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Email"
          placeholder="Email"
          error={error ? 'Invalid user or password' : false}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            setError(false);
          }}
        />
        <Form.Input
          fluid
          label="Password"
          placeholder="Password"
          type='password'
          value={password}
          onChange={e => {
            setPassword(e.target.value);
            setError(false);
          }}
          error={error ? 'Invalid user or password' : false}
        />
        <Button type="submit">Login</Button>
      </Form>
      <Link to="/signup" className="item">
        Don't have an account? Register here.
      </Link>
    </>
  );
};

export default Login;
