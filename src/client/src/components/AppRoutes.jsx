import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from "react-router";
import { useSelector } from 'react-redux';
import classes from '../styles/AppRoutes.module.css'
import ArticleCreator from './ArticleCreator';
import App from './App';
import LoginPage from './LoginPage';
import MyArticle from './MyArticle';
import Header from '../UI/Header';
import host from '../data/host';

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
