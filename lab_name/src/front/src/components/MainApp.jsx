import React from 'react'
import { useSelector } from 'react-redux/es/exports'

const MainApp = () => {
    const articles = useSelector(state => state.articles.articles)

  return (
    <div>MainApp</div>
  )
}

export default MainApp