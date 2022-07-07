import React, {useEffect} from 'react'
import { useSelector } from 'react-redux/es/exports'
import { useNavigate } from 'react-router-dom'
import classes from '../styles/MainApp.module.css'
import Loader from './Loader'
import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'

const MainApp = () => {
    const articles = useSelector(state => state.articles.articles)
    const userInfo = useSelector(state => state.user)
    const navigator = useNavigate()
    console.log(userInfo)

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
            {userInfo.user === 'admin' && <button onClick={createArticleHandler}>Create article</button>}
        </section>
        <section className={classes.articles}>
            main page
        </section>
    </main>
  )
}

export default MainApp