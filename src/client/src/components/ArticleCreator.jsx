import React, {useState} from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux/es/exports'
import { ThemeProvider, Button } from '@mui/material'

import host from '../data/host'

import styles from '../styles/ArticleCreator.module.css'
// import ButtonStyles from '../styles/LoginPage.module.css'
import classes from '../styles/MyArticle.module.css'
import greenTheme from '../UI/theme'

const TextEditor = React.lazy(() => import('../UI/TextEditor'))


const ArticleCreator = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const {id, user} = useSelector(state => state.user)
    const navigator = useNavigate()

    const addNewArticle = async (e) => {
        e.preventDefault()
        let date = new Date()
	      date = `{"year": ${date.getFullYear()}, "month": ${date.getMonth()+1}, "day": ${date.getDate()}}`
        const requestBody = {
            title,
            body,
            userid: id,
            date,
            description
        }
        console.log(requestBody)
        // const resp = 
            await fetch(`http://${host}:5000/api/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        navigator('/')
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
              <div>
                <h2>Short article description</h2>
                <textarea rows={3} cols={60} value={description} onChange={e => setDescription(e.target.value)} placeholder='description'></textarea>
              </div>
              <main>
                <div>
                    <TextEditor setText={setBody}/>
                </div>
              </main>
              <footer>
                <ThemeProvider theme={greenTheme}>
                  <Button variant="contained" onClick={addNewArticle}>Post new article!</Button>
                </ThemeProvider>
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