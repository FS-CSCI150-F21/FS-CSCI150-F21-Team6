import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import AddPost from "./components/AddContact";
import EditContact from "./components/EditContact";
//import Home from "./components/Home";
import Friends from "./components/Home/Home";
//import "./styles.css";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
      <ToastContainer />
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts" />} />
          <Route path="/posts" exact component={Home} />
          <Route exact path="/" component={() => <Home />} />
          <Route exact path="/add" component={() => <AddPost />} />
          <Route path="/Friends" component={() => <Friends />} />
          <Route exact path="/edit/:id" component={() => <EditContact />} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;