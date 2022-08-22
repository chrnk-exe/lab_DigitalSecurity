import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import Loader from './Loader'

import classes from '../styles/MyArticle.module.css'
import commentItemStyles from '../styles/CommentItem.module.css'
import buttonStyles from '../styles/LoginPage.module.css'

import { setArticleState, setComments } from '../data/articlesReducer'
import CommentItem from './CommentItem'
import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'

const MyArticle = ({id}) => {
    const navigator = useNavigate()
    const dispatch = useDispatch()

    const { currentArticle, comments } = useSelector(state => state.articles)
    const userIsAdmin = useSelector(state => state.user.user) === 'admin'
    const userName = useSelector(state => state.user.name)
    const userid = useSelector(state => state.user.id)

    const [comment, setComment] = useState('')

    const formatDate = (date) => {
      let ldate = new Date(date)
      return [ldate.getFullYear(), ldate.getMonth()+1, ldate.getDate()].join('-')
  }

    const sendCommentHandler = (e) => {
      e.preventDefault()
      const randId = Date.now()
      fetch('http://localhost:5000/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({name: userName, admin: userIsAdmin, body: comment, 'postId': id, 'id': userid})
      })
      dispatch(setComments([...comments, {'articleid': id, id: randId, body: comment, name: userName}]))
    }

    useEffect(() => {
      const fetchData = async (id) => {
        let resp = await fetch(`http://localhost:5000/api/posts?id=${id}`)
        if(resp.status === 200){
          resp = await resp.json()
          dispatch(setArticleState({
            articles: resp.data,
            comments: resp.comments
          }))
          console.log(resp)
        }
      }
      fetchData(id)
    }, [id])

  return (
    <div className={classes.articlePage}>
      <article className={classes.articleContainer}>
        <header className={classes.articleHeader}>
          <h1>{currentArticle?.title}</h1>
        </header>
        <main>
          <p>Date of creation: {formatDate(currentArticle?.date_of_creation)} / created by <span className={classes.greenSpan}>Ivan Kotov</span></p>
          <div>
            <pre>
              {currentArticle?.body}
            </pre>
          </div>
        </main>
        <footer className={classes.footer}>
          <header>
            Comments
          </header>
          <div className={classes.comments}>
            {comments 
            ? comments.map((comment, index) => <CommentItem key={index} name={comment.name} email={comment.email} body={comment.body} />)
            : <Loader />}
          </div>
          <div className={classes.commentArea}>
            Leave your comment here!
            <div className={commentItemStyles.CommentItem}>
                <img style={{borderRadius: '5px'}} src={userIsAdmin ? adminPic : userPic} width={80} height={80}/>
                <div className={commentItemStyles.content}>
                    <div className={commentItemStyles.names}><h2>{userName}</h2></div>
                    <textarea value={comment} onChange={e => setComment(e.target.value)} className={classes.textArea} cols={65} rows={5}/>
                </div>
            </div>
            <button onClick={sendCommentHandler} className={buttonStyles.LoginPageButton + ' ' + classes.ButtonFix}>Send your comment!</button>
          </div>
        </footer>
      </article>

      <section className={classes.suggestedPosts}>
        <header>
          Suggested posts!
        </header>
        <div>Coming soon...</div>
      </section>
    </div>
  )
}

export default MyArticle