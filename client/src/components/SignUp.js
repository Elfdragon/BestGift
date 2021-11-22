import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';

import api from '../apis/server';
import history from '../history';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setPasswordError(true);
    } else {
      const response = await api.post('/users/signup', { email, password, confirmPassword });
      if(response.data){
        history.push("/login");
      }
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          fluid
          label="Email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Form.Input
          fluid
          label="Password"
          placeholder="Password"
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Form.Input
          fluid
          label="Confirm Password"
          placeholder="Confirm Password"
          type='password'
          value={confirmPassword}
          onChange={e => {
            setConfirmPassword(e.target.value);
            setPasswordError(false);
          }}
          error={passwordError ? 'Passwords must match.' : false}
        />
        <Button type="submit">Sign Up</Button>
      </Form>
      <Link to="/login" className="item">
        Already have an account? Login here.
      </Link>
    </>
  );
};

export default SignUp;
