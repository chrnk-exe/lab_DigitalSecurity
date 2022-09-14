import React, {useState} from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux/es/exports'
import { 
  ThemeProvider, 
  Button, 
  Select, 
  MenuItem, 
  TextField, 
  InputLabel 
} from '@mui/material'

import formatDate from '../assets/formatDate'
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
    const [customDate, setCustomDate] = useState('')
    const [showDateInput, setShowDateInput] = useState(false)
    const {id, user} = useSelector(state => state.user)
    const navigator = useNavigate()

    const addNewArticle = async (e) => {
        e.preventDefault()
        let date = new Date()
        if(showDateInput){
          date = customDate
        } else {
          date = `{"year": ${date.getFullYear()}, "month": ${date.getMonth()+1}, "day": ${date.getDate()}}`
        }
        const requestBody = {
            title,
            body,
            userid: id,
            date,
            description
        }
        const resp = 
            await fetch(`http://${host}:5000/api/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        const respBody = await resp.json()
        alert(respBody.info)
        if(respBody !== 'date error')navigator('/')
    }

    const handleInput = e => {
      setShowDateInput(e.target.value)
    }

    if(user !== 'admin') {
        return (
            <div>Access denied!</div>
        )
    } else {
        return (
            <div className={classes.articlePage}>
            <article className={classes.articleContainer}>
              <header className={[classes.articleHeader, classes.articleContainerItem].join(' ')}>
                <h1>Title: <input className={styles.title} placeholder='Awesome title!' value={title} onChange={e => setTitle(e.target.value)}/></h1>
              </header>
              <div className={classes.articleContainerItem}>
                <h2>Short article description</h2>
                <textarea rows={3} cols={60} value={description} onChange={e => setDescription(e.target.value)} placeholder='description'></textarea>
              </div>
              <div className={classes.articleContainerItem}>
                <InputLabel id="date-label">Date</InputLabel>
                <Select labelId={'date-label'} defaultValue={false} onChange={handleInput}>
                  <MenuItem value={false}>Auto</MenuItem>
                  <MenuItem value={true}>Input</MenuItem>
                </Select>
                <TextField 
                  disabled={!showDateInput} 
                  placeholder={formatDate(new Date())} 
                  style={{marginLeft: '10px'}} 
                  value={showDateInput ? customDate : formatDate(new Date())} 
                  onChange={e => setCustomDate(e.target.value)}/>
              </div>
              <main className={classes.articleContainerItem}>
                <div>
                    <TextEditor setText={setBody}/>
                </div>
              </main>
              <footer className={classes.articleContainerItem}>
                <ThemeProvider theme={greenTheme}>
                  <Button variant="contained" onClick={addNewArticle}>Post new article!</Button>
                </ThemeProvider>
              </footer>
            </article>
      
            <section className={classes.suggestedPosts} style={{visibility: 'hidden'}}>
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