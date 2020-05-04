import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

const Home = () => {
  return <div>Home</div>;
};

const SignIn = () => {
  return <div>Sign In</div>;
};

const SignUp = () => {
  return <div>Sign Up</div>;
};

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
        </div>
      </BrowserRouter>
    </div>
  );
};
