import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux';
import classes from '../styles/App.module.css'
import Loader from './Loader';
import MainApp from './MainApp';
import { setArticlesRedux } from '../data/articlesReducer';

function App() {
  const [articles, setArticles] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchData(){
      let res = await fetch('http://localhost:5000')
      res = await res.json()
      console.log(res)
      setArticles(true)
      dispatch(setArticlesRedux(res))
    }
    fetchData()
  }, [dispatch])

  return (
    <div className={classes.App}>
      {!articles 
      ? <Loader />
      : <MainApp />
      }
    </div>
  );
}

export default App;
