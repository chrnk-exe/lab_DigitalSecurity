import React, {useState, useEffect} from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import classes from '../styles/App.module.css'
import Loader from './Loader';
import ArticleCreator from './ArticleCreator';
import MainApp from './MainApp';
import { setArticlesRedux } from '../data/articlesReducer';
import LoginPage from './LoginPage';
import MyArticle from './MyArticle';

function App() {
  const articles = useSelector(state => state.articles.articles)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // navigate('/login', {replace: true})
    async function fetchData(){
      let res = await fetch('http://localhost:5000')
      res = await res.json()
      console.log(res)
      dispatch(setArticlesRedux(res.articles))
    }
    fetchData()
  }, [])

  return (
    <div className={classes.App}>
        <Routes>
          <Route exact={true} path="/login" element={<LoginPage/>} />
          <Route exact={true} path="/" element={<MainApp />} />
          <Route exact={true} path="/create" element={ <ArticleCreator />} />
          {
            articles.map(article => <Route key={article.id} path={`/posts/${article.id}`} element={ <MyArticle id={article.id}/>}></Route>)
          }
        </Routes>
      {/* {!articles 
      ? <Loader />
      : <MainApp />
      } */}
    </div>
  );
}

export default App;
