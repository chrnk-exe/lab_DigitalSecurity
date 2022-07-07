import React, {useEffect} from 'react'
import { useSelector } from 'react-redux/es/exports'
import { Route, useNavigate, useLocation } from 'react-router-dom'
import classes from '../styles/MainApp.module.css'
import Loader from './Loader'
import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'
import ArticlePreview from './ArticlePreview'
import MyArticle from './MyArticle'

const MainApp = () => {
    const articles = useSelector(state => state.articles.articles)
    // console.log(articles)
    const userInfo = useSelector(state => state.user)
    const navigator = useNavigate()
    const location = useLocation()

    const createArticleHandler = e => {
        e.preventDefault()
        navigator('/create', {replace: true})
    }

  return (
    <main className={classes.main}>
        <section className={classes.adminCard}>
            <img src={userInfo.user === 'admin' ? adminPic : userPic} className={classes.userPic}/>
            <div className={classes.userInfo}>
                <h3>{userInfo.name}</h3>
                {userInfo.user === 'admin' ? <p>admin</p> : <p>user</p>}
            </div>
            {userInfo.user === 'admin' && (
                <div className={classes.createArticleButtonContainer}>
                    <button className={classes.createArticleButton} onClick={createArticleHandler}>Create article</button>
                </div>)}
        </section>
        <section className={classes.articles}>
            <header className={classes.articlesHeader}>
                <h1>{'My Blog'}</h1>
            </header>
            <main>
                {articles.map(article => <ArticlePreview title={article.title} body={article.body} key={article.id} id={article.id}/>)}

                
            </main>
        </section>
    </main>
  )
}

export default MainApp