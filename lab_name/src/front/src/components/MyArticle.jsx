import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import classes from '../styles/MyArticle.module.css'

const MyArticle = ({id}) => {
    const navigator = useNavigate()
    const [article, setArticle] = useState()
    const backButtonHandler = () => {
        navigator('/')
    }

    useEffect(() => {
      window.onpopstate = () => {
        navigator('/')
      }

      // console.log(id)
      const fetchData = async (id) => {
        let resp = await fetch(`http://localhost:5000/api/posts?id=${id}`)
        if(resp.status === 200){
          resp = await resp.json()
        }
        setArticle(resp)
      }
      fetchData(id)
    }, [id])

  return (
    <div className={classes.articlePage}>
      <article>
        <header>
          <h1>{article?.title}</h1>
        </header>
        <main>
          <p>Date of creation: {article?.date} / created by <span className={classes.greenSpan}>Ivan Kotov</span></p>
          <div>
            <pre>
              {article?.body}
            </pre>
          </div>
        </main>
        <footer>

        </footer>
      </article>
    </div>
  )
}

export default MyArticle