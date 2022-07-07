import React from 'react'
import { useSelector } from 'react-redux/es/exports'
import classes from '../styles/MainApp.module.css'
import Loader from './Loader'

const MainApp = () => {
    const articles = useSelector(state => state.articles.articles)
    const user = useSelector(state => state.user.user)
    
  return (
    <div>
        <main className={classes.main}>
            <section className={classes.adminCard}>

            </section>
            <section className={classes.articles}>
                main page
            </section>
        </main>
    </div>
  )
}

export default MainApp