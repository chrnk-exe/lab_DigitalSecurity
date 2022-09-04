import React from 'react'
import {
  Routes,
  Route
} from "react-router";

import App from './App';
import ArticleCreator from './ArticleCreator';
import LoginPage from './LoginPage';
import MyArticle from './MyArticle';
import Header from '../UI/Header';

import classes from '../styles/AppRoutes.module.css'

function AppRoutes() {
  return (
    <div className={classes.App}>
      <Header/>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route exact path="/login/" element={<LoginPage/>}>
          <Route path=":sign" element={<LoginPage/>}/>
        </Route>
        <Route exact path="/create" element={ <ArticleCreator />} />
        <Route exact path="/posts/" >
          <Route path=":id" element={<MyArticle/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default AppRoutes;
