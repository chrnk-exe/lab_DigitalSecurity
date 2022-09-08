import React, {Suspense} from 'react'
import {
  Routes,
  Route
} from "react-router";

import App from './App';
import ArticleCreator from './ArticleCreator';
import LoginPage from './LoginPage';
import MyArticle from './MyArticle';
import Header from '../UI/Header';
import Loader from './Loader';
import Settings from './Settings';

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
        <Route exact path="/create" element={ 
          <Suspense fallback={<Loader/>}>
            <ArticleCreator />
          </Suspense>
          } />
        <Route exact path="/posts/" >
          <Route path=":id" element={<MyArticle/>}/>
        </Route>
        <Route exact path="/settings" element={ <Settings />}/>
        </Routes>
    </div>
  );
}

export default AppRoutes;
