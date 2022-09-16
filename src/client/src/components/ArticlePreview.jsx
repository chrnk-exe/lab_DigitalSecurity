import React from 'react';
import { useNavigate } from 'react-router-dom';

import classes from '../styles/ArticlePreview.module.css';

const ArticlePreview = ({ title, body, id, date }) => {
    const navigate = useNavigate();
    const formatDate = date => {
        let ldate = new Date(date);
        return [
            ldate.getFullYear(),
            ldate.getMonth() + 1,
            ldate.getDate(),
        ].join('-');
    };

    return (
        <div className={classes.ArticlePreview}>
            <header className={classes.ArticlePreviewHeader}>
                <h2>{title}</h2>
            </header>
            <div className={classes.divider}>
                <p>
                    {formatDate(date)} / by <span>{'admin'}</span>
                </p>
            </div>
            <article>
                <p>{body}</p>
            </article>
            <button
                onClick={() => navigate(`/posts/${id}`)}
                className={classes.readMore}>
                Read more
            </button>
        </div>
    );
};

export default ArticlePreview;
