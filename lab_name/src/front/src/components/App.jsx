import React, {useState, useEffect} from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import classes from '../styles/App.module.css'
import Loader from './Loader';
import ArticleCreator from './ArticleCreator';
import MainApp from './MainApp';
import { setArticlesRedux } from '../data/articlesReducer';
import LoginPage from './LoginPage';

function App() {
  // const [articles, setArticles] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // navigate('/login', {replace: true})
    async function fetchData(){
      let res = await fetch('http://localhost:5000')
      res = await res.json()
      console.log(res)
      dispatch(setArticlesRedux(res))
    }
    fetchData()
  }, [])

  return (
    <div className={classes.App}>
        <Routes>
          <Route exact={true} path="/login" element={<LoginPage/>} />
          <Route exact={true} path="/" element={<MainApp />} />
          <Route exact={true} path="/create" element={ <ArticleCreator />} />
        </Routes>
      {/* {!articles 
      ? <Loader />
      : <MainApp />
      } */}
    </div>
  );
}

export default App;
