import React, { useState } from 'react';
import axios from 'axios';
import * as Components from "../components/loginComponent";
import Navbar from "../components/navbar";
import '../App.css';

function Login() {
  const [signIn, toggle] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      }, {
        withCredentials: true
      });
      console.log(response.data.message)
      setMessage(response.data.message);
      setUser(response.data.actualUser);
      // Optionally, you can store the token in localStorage or context for further usage
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error logging in');
    }
  };

  return (
    <>
      <Navbar style={{ position: 'relative', zIndex: '100000' }} />
      <Components.Container style={{ marginTop: "-42px" }}>
        <Components.SignUpContainer signingin={signIn.toString()}>
          <Components.Form>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type="text" placeholder="Name" />
            <Components.Input type="email" placeholder="Email" />
            <Components.Input type="password" placeholder="Password" />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignInSubmit}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
      {message && (
        <div className="message">
          <p>{message}</p>
          {user && <p>Welcome, {user.name}!</p>}
        </div>
      )}
    </>
  );
}

export default Login;
