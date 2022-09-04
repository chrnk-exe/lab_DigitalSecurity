import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import Pagination from '@mui/material/Pagination'

import ArticlePreview from './ArticlePreview'
import Loader from './Loader'
import { setArticlesRedux } from '../data/articlesReducer'
import host from '../data/host'

import classes from '../styles/App.module.css'
import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'

const App = () => {
    const {articles, maxArticles} = useSelector(state => state.articles)
    const aaa = useSelector(state => state.articles)
    const userInfo = useSelector(state => state.user)
    const [page, setPage] = useState(1)
    const dispatch = useDispatch()
    const navigator = useNavigate()
    console.log(aaa)
    useEffect(() => {
        async function fetchData(){
            let res = await fetch(`http://${host}:5000/articles?page=${page}`, {
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
    
    const pageHandler = async (e, p) => {
        setPage(p)
        let res = await fetch(`http://${host}:5000/articles?page=${p}`, {
                method: 'GET',
            })
        res = await res.json()
        dispatch(setArticlesRedux(res))
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <main className={userInfo.id !== -1? [classes.mainWithUser, classes.main].join(' ') : [classes.main, classes.mainWithoutUser].join(' ')}>
            <section className={classes.adminCard} style={{display: userInfo.id === -1 ? 'none' : 'flex'}}>
                <img src={userInfo.user === 'admin' ? adminPic : userPic} className={classes.userPic} alt=''/>
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
                    <h1>{'Omega IT Technologies news!'}</h1>
                </header>
                <main>
                    {articles?.length === 0
                    ? <Loader />
                    : articles?.map((article, index) => <ArticlePreview title={article.title} body={article.body} key={article.id} id={article.id} date={article.date_of_creation}/>)}
                </main>
                <footer className={classes.footer}>
                    <Pagination 
                    variant="outlined" 
                    color="secondary" 
                    size="large" 
                    page={page}
                    onChange={pageHandler}
                    count={Math.ceil(maxArticles / 10)} 
                    />
                </footer>
            </section>
        </main>
    )
}

export default App