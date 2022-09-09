import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import Button from '@mui/material/Button'

import Loader from './Loader'
import { setArticleState, setComments } from '../data/articlesReducer'
import host from '../data/host'

import CommentItem from './CommentItem'
import SignButtons from '../UI/SignButtons'
import greenTheme from '../UI/theme'
import formatDate from '../assets/formatDate'
// import onEnterPress from '../assets/onEnterPress'
import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'
import classes from '../styles/MyArticle.module.css'
import commentItemStyles from '../styles/CommentItem.module.css'

// {id}
const MyArticle = () => {
    const dispatch = useDispatch()

    const { id } = useParams()
    const { currentArticle, comments } = useSelector(state => state.articles)
    const userIsAdmin = useSelector(state => state.user.user) === 'admin'
    const userName = useSelector(state => state.user.name)
    const userid = useSelector(state => state.user.id)

    const [comment, setComment] = useState('')

    const sendCommentHandler = (e) => {
      e.preventDefault()
      const randId = Date.now()
      fetch(`http://${host}:5000/api/comment`, {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({name: userName, admin: userIsAdmin, body: comment, 'postId': id, 'id': userid})
      })
      dispatch(setComments([...comments, {'articleid': id, id: randId, body: comment, name: userName, isadmin: userIsAdmin}]))
    }

    useEffect(() => {
      const fetchData = async (id) => {
        let resp = await fetch(`http://${host}:5000/api/posts?id=${id}`)
        if(resp.status === 200){
          resp = await resp.json()
          console.log(resp)
          dispatch(setArticleState({
            articles: resp.data,
            comments: resp.comments
          }))
        }
      }
      fetchData(id)
    }, [id])

    const onEnterPress = async (e) => {
      if(e.code === 'Enter'){
          sendCommentHandler(e)
          setComment('')
      }
  }

  return (
    <div className={classes.articlePage}>

      <article className={classes.articleContainer}>

        <header className={classes.articleHeader}>
          <h1>{currentArticle?.title}</h1>
        </header>

        <main>
          <p>Date of creation: {formatDate(currentArticle?.date_of_creation)} / created by <span className={classes.greenSpan}>Ivan Kotov</span></p>
          <div>
            <div className={classes.articleBody} dangerouslySetInnerHTML={{__html:currentArticle.body}}/>
            {/* <pre>
              {currentArticle?.body}
            </pre> */}
          </div>
        </main>

        <footer className={classes.footer}>
          <header>
            Comments
          </header>
          <div className={classes.comments}>
            {comments 
            ? comments.map((comment, index) => <CommentItem key={index} name={comment.name} email={comment.email} body={comment.body} isadmin={comment.isadmin}/>)
            : <Loader />}
          </div>
          <div className={classes.commentArea}>
            Leave your comment here!
            <div className={commentItemStyles.CommentItem}>
                <img style={{display: userid === -1 ? 'none' : 'block' ,borderRadius: '5px'}} src={userIsAdmin ? adminPic : userPic} width={80} height={80} alt=''/>
                <div className={commentItemStyles.content}>                      
                    <div className={commentItemStyles.names}><h2>{userid !== -1 ? userName : "Comments can be posted only by authorized users!"}</h2></div>
                    {
                      userid !== -1
                      ?<textarea value={comment} onChange={e => setComment(e.target.value)} onKeyDown={onEnterPress} className={classes.textArea} cols={65} rows={5}/>
                      : <SignButtons theme={greenTheme} color={'secondary'}/>
                    }
                </div>
            </div>
            <div className={classes.myArticleButton}>
              <Button variant="contained" fullWidth disabled={userid === -1} onClick={sendCommentHandler}>Send your comment!</Button>
            </div>
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