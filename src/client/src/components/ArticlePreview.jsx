import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux/es/exports'

import { setArticleState } from '../data/articlesReducer'
import host from '../data/host'

import classes from '../styles/ArticlePreview.module.css'

const ArticlePreview = ({title, body, id, date}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formatDate = (date) => {
        let ldate = new Date(date)
        return [ldate.getFullYear(), ldate.getMonth()+1, ldate.getDate()].join('-')
    }

    const goToArticleHandler = async () => {
        let resp = await fetch(`http://${host}/api/posts?id=${id}`)
        if(resp.status === 200){
            resp = await resp.json()
            dispatch(setArticleState({
                articles: resp.data,
                comments: resp.comments
            }))
        }
        navigate(`/posts/${id}`)
    }

  return (
    <div className={classes.ArticlePreview}>
        <header className={classes.ArticlePreviewHeader}>
            <h2>{title}</h2>
        </header>
        <div className={classes.divider}>
            <p>{formatDate(date)} / by <span>{'admin'}</span></p>
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