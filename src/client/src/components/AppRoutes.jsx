import React, {Suspense, useEffect} from 'react'
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
import { useDispatch } from 'react-redux/es/exports';

import classes from '../styles/AppRoutes.module.css'
import host from '../data/host';
import { setAdmin, setUser } from '../data/userReducer';

function AppRoutes() {
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchDate = async () => {
      let res = await fetch(`http://${host}:5000/authorize`, {
        credentials: "include",
      })
      res = await res.json()
      if(res['info']){
        if(res['isadmin']){
          dispatch(setAdmin({name: res['login'], id: res['id'], flag: res['flag']}))
        } else {
          dispatch(setUser({name: res['login'], id: res['id']}))
        }
      }
      console.log(res)
      console.log(document.cookie)
      
    }

    fetchDate()
  }, [])

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
