import React, {useState} from 'react'
import styles from '../styles/ArticleCreator.module.css'
import ButtonStyles from '../styles/LoginPage.module.css'
import classes from '../styles/MyArticle.module.css'
import { useSelector } from 'react-redux/es/exports'
import host from '../data/host'

const ArticleCreator = () => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const {id, user} = useSelector(state => state.user)

    const addNewArticle = async (e) => {
        e.preventDefault()
        let date = new Date()
	    date = `{"year": ${date.getFullYear()}, "month": ${date.getMonth()+1}, "day": ${date.getDate()}}`
        const requestBody = {
            title,
            body,
            userid: id,
            date
        }
        const resp = await fetch(`http://${host}:5000/api/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        // console.log(JSON.stringify(requestBody))
    }

    if(user !== 'admin') {
        return (
            <div>Access denied!</div>
        )
    } else {
        return (
            <div className={classes.articlePage}>
            <article className={classes.articleContainer}>
              <header className={classes.articleHeader}>
                <h1>Title: <input className={styles.title} placeholder='Awesome title!' value={title} onChange={e => setTitle(e.target.value)}/></h1>
              </header>
              <main>
                {/* <p>Date of creation: {currentArticle?.date} / created by <span className={classes.greenSpan}>Ivan Kotov</span></p> */}
                <div>
                  <pre>
                    <textarea className={styles.body} value={body} onChange={e => setBody(e.target.value)} cols={80} rows={10} />
                  </pre>
                </div>
              </main>
              <footer>
                <button onClick={addNewArticle} className={ButtonStyles.LoginPageButton}>Post new article!</button>
              </footer>
            </article>
      
            <section className={classes.suggestedPosts}>
              <header>
                Choose suggested posts
              </header>
              <div>Coming soon...</div>
            </section>
          </div>
        )
    }
        
}

export default ArticleCreator