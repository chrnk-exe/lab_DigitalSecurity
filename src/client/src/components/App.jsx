import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import classes from '../styles/App.module.css'
import Loader from './Loader'
import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'
import ArticlePreview from './ArticlePreview'
import { setArticlesRedux } from '../data/articlesReducer'
import host from '../data/host'

const App = () => {
    const articles = useSelector(state => state.articles.articles)
    const userInfo = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigator = useNavigate()

    useEffect(() => {
        async function fetchData(){
            let res = await fetch(`http://${host}:5000/articles`, {
                method: 'GET',
            })
            res = await res.json()
            dispatch(setArticlesRedux(res))
          }
          fetchData()
    }, [])

    const createArticleHandler = e => {
        e.preventDefault()
        navigator('/create')
    }
  return (
    <main className={userInfo.id !== -1? [classes.mainWithUser, classes.main].join(' ') :classes.main}>
        <section className={classes.adminCard} style={{display: userInfo.id === -1 ? 'none' : 'flex'}}>
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
                <h1>{'"Company name" news!'}</h1>
            </header>
            <main>
                {articles?.length === 0
                ? <Loader />
                : articles?.map((article, index) => <ArticlePreview title={article.title} body={article.body} key={article.id} id={article.id} date={article.date_of_creation}/>)}
            </main>
        </section>
    </main>
  )
}

export default App