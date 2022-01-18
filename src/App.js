import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Layout from './components/UI/AppBar/Layout/Layout';
import Main from './containers/MainPages/Main/Main';
import AuthPage from './containers/MainPages/AuthPage/AuthPage';
import Home from "./containers/MainPages/Home/Home";
import GalleryForm from "./components/GalleryForm/GalleryForm";


const App = () => {

  return (
    <Layout>
      <Switch>
        <Route path="/gallery/:id" exact component={Main}/>
        <Route path="/" exact component={Home}/>
        <Route path="/create/:id" exact component={GalleryForm}/>
        <Route path="/create" exact component={GalleryForm}/>
        <Route path="/login" component={AuthPage}/>
        <Route render={() => <h1>Not found</h1>}/>
      </Switch>
    </Layout>
  );
};

export default App;


