import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import redSVG from '../assets/close-circle-outline.svg';
import adminPic from '../assets/admin.jpg';
import userPic from '../assets/user.jpg';
import classes from '../styles/CommentItem.module.css';
import host from '../data/host';
import { setComments } from '../reducers/articlesReducer';

const CommentItem = ({ id, name, body, isadmin }) => {
    const userInfo = useSelector(state => state.user);
    const currentArticleid = useSelector(
        state => state.articles.currentArticle.id,
    );
    const comments = useSelector(state => state.articles.comments);
    const dispatch = useDispatch();

    const deleteHandler = async () => {
        const resp = await fetch(`http://${host}/api/delete_comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                commentid: id,
                articleid: currentArticleid,
            }),
        }).then(res => res.json());
        if (resp.deleted) {
            let newComments = comments.filter(comment => comment.id !== id);
            dispatch(setComments(newComments));
        }
    };

    return (
        <div className={classes.CommentItem}>
            <img
                style={{ borderRadius: '5px' }}
                src={isadmin ? adminPic : userPic}
                width={80}
                height={80}
                alt=""
            />
            <div className={classes.content}>
                <div className={classes.names}>
                    <h2>{name}</h2>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: body }}
                    className={classes.body}
                />
            </div>
            <img
                style={
                    userInfo.user === 'admin' ? undefined : { display: 'none' }
                }
                id={'deleteButton'}
                className={classes.deleteButton + ' deleteButton'}
                src={redSVG}
                height={30}
                alt=""
                onClick={deleteHandler}
            />
        </div>
    );
};

export default CommentItem;
