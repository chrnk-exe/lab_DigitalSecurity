import React, {useState, useEffect} from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useSelector } from 'react-redux';
import classes from '../styles/App.module.css'
import Loader from './Loader';
import ArticleCreator from './ArticleCreator';
import MainApp from './MainApp';
import { setArticlesRedux } from '../data/articlesReducer';
import LoginPage from './LoginPage';
import MyArticle from './MyArticle';
import backArrow from '../assets/back.svg'

function App() {
  const articles = useSelector(state => state.articles.articles)
  const id = useSelector(state => state.user.id)
  const navigate = useNavigate()

  useEffect(() => {
    window.addEventListener('popstate', () => {
      navigator('/')
    })
    // console.log(window.sessionStorage)
    if(id === -1)navigate('/login', {replace: true})
  }, [])

  const logout = () => {
    window.sessionStorage.clear()
    window.location.reload()
  }

  return (
    <div className={classes.App}>
        <Routes>
          <Route exact={true} path="/login" element={<LoginPage/>} />
          <Route exact={true} path="/" element={<MainApp />} />
          <Route exact={true} path="/create" element={ <ArticleCreator />} />
          {
            articles
            ? articles.map((article, index) => <Route key={index} path={`/posts/${article.id}`} element={ <MyArticle id={article.id}/>}></Route>)
            : null
          }
        </Routes>
        <button onClick={() => navigate('/', {replace: true})} className={classes.backButton} disabled={id === -1}> <img src={backArrow} height={35} width={35} alt=''/>Back</button>
        <button style={id === -1 ? {display: 'none'} : null} onClick={logout} className={classes.backButton + ' ' + classes.logout} disabled={id === -1}>Log out</button>
    </div>
  );
}

export default App;
