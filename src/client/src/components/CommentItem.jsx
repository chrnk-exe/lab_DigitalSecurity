import React from 'react'

import flagHandler from '../assets/flagHandler'

import adminPic from '../assets/admin.jpg'
import userPic from '../assets/user.jpg'
import classes from '../styles/CommentItem.module.css'

const CommentItem = ({name, body}) => {
  flagHandler(body)
  return (
    <div className={classes.CommentItem}>
        <img style={{borderRadius: '5px'}} src={name === 'Ivan Kotov' ? adminPic : userPic} width={80} height={80} alt=''/>
        <div className={classes.content}>
            <div className={classes.names}><h2>{name}</h2></div>
            <div dangerouslySetInnerHTML={{__html: body}} className={classes.body}/>
        </div>
    </div>
  )
}

export default CommentItem