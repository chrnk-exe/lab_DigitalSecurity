import React from 'react'
import { useSelector } from 'react-redux/es/exports'

const ArticleCreator = () => {
    const user = useSelector(state => state.user.user)
    if(user !== 'admin') {
        return (
            <div>Access denied!</div>
        )
    } else {
        return (
            <div>ArticleCreator</div>
        )
    }
        
}

export default ArticleCreator