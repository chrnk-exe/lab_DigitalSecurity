import React from 'react'
import {
  Routes,
  Route,
  Navigate
} from "react-router";
import { useSelector } from 'react-redux';
import classes from '../styles/App.module.css'
import ArticleCreator from './ArticleCreator';
import MainApp from './MainApp';
import LoginPage from './LoginPage';
import MyArticle from './MyArticle';
import host from '../data/host';

function App() {
  const id = useSelector(state => state.user.id)

  const logout = () => {
    window.sessionStorage.clear()
    window.location.reload()
  }
  

  return (
    <div className={classes.App}>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/" element={id === -1 ? <Navigate to={'/login'} replace/> :<MainApp />} />
          <Route exact path="/create" element={ <ArticleCreator />} />
          <Route exact path={'/posts/'} >
            <Route path={':id'} element={<MyArticle/>}/>
          </Route>
        </Routes>
        <button style={id === -1 ? {display: 'none'} : null} onClick={logout} className={classes.backButton + ' ' + classes.logout} disabled={id === -1}>Log out</button>
    </div>
  );
}

export default App;
