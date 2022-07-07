import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux/es/exports'
// import { setArticleState } from '../data/articlesReducer'
// import history from 'history/browser'
import classes from '../styles/ArticlePreview.module.css'

const ArticlePreview = ({title, body, id}) => {
    const location = useLocation()
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const goToArticleHandler = async () => {
        // let resp = await fetch(`http://localhost:5000/api/posts?id=${id}`)
        // if(resp.status === 200){
        //     resp = await resp.json()
        //     dispatch(setArticleState({
        //         articles: resp.data,
        //         comments: resp.comments
        //     }))
        // }
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