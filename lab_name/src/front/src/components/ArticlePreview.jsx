import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import history from 'history/browser'
import classes from '../styles/ArticlePreview.module.css'

const ArticlePreview = ({title, body, id}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const goToArticleHandler = () => {
        navigate(`/posts/${id}`, {replace: true, state: {id}})
    }

  return (
    <div className={classes.ArticlePreview}>
        <header className={classes.ArticlePreviewHeader}>
            <h2>{title}</h2>
        </header>
        <div className={classes.divider}>
            <p>{'date'} / by <span>{'author'}</span></p>
        </div>
        <article>
            <p>{body}</p>
        </article>
        <button onClick={goToArticleHandler} className={classes.readMore}>
            Read more
        </button>
    </div>
  )
}

export default ArticlePreview