import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { Button, ThemeProvider } from '@mui/material';

import ArticlePreview from './ArticlePreview';
import Loader from './Loader';
import { setArticlesRedux } from '../reducers/articlesReducer';
import host from '../data/host';

import classes from '../styles/App.module.css';
import greenTheme from '../UI/theme';
import adminPic from '../assets/admin.jpg';
import userPic from '../assets/user.jpg';
import logo from '../assets/Omega.png';

const App = () => {
    const { articles, maxArticles } = useSelector(state => state.articles);
    const userInfo = useSelector(state => state.user);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const navigator = useNavigate();
    useEffect(() => {
        async function fetchData() {
            let res = await fetch(`http://${host}/articles?page=${page}`, {
                method: 'GET',
                credentials: 'include',
            });
            res = await res.json();
            dispatch(setArticlesRedux(res));
        }
        fetchData();
    }, []);

    const createArticleHandler = e => {
        e.preventDefault();
        navigator('/create');
    };

    const pageHandler = async (e, p) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setPage(p);
        let res = await fetch(`http://${host}/articles?page=${p}`, {
            method: 'GET',
            credentials: 'include',
        });
        res = await res.json();
        dispatch(setArticlesRedux(res));
    };

    return (
        <main
            className={
                userInfo.id !== -1
                    ? [classes.mainWithUser, classes.main].join(' ')
                    : [classes.main, classes.mainWithoutUser].join(' ')
            }>
            <section
                className={classes.adminCard}
                style={{ display: userInfo.id === -1 ? 'none' : 'flex' }}>
                <img
                    src={userInfo.user === 'admin' ? adminPic : userPic}
                    className={classes.userPic}
                    alt=""
                />
                <div className={classes.userInfo}>
                    <h3>{userInfo.name}</h3>
                    {userInfo.user === 'admin' ? <p>admin</p> : <p>user</p>}
                </div>
                <div className={classes.createArticleButtonContainer}>
                    <ThemeProvider theme={greenTheme}>
                        <Button
                            style={{
                                width: '90%',
                                marginBlock: '10px',
                            }}
                            variant="contained"
                            onClick={() => navigator('/settings')}>
                            Profile Settings
                        </Button>
                        {userInfo.user === 'admin' && (
                            <Button
                                style={{ width: '90%' }}
                                variant="contained"
                                onClick={createArticleHandler}>
                                Create article
                            </Button>
                        )}
                    </ThemeProvider>
                </div>
            </section>
            <section className={classes.articles}>
                <header className={classes.articlesHeader}>
                    <img
                        className={classes.logo}
                        src={logo}
                        height={80}
                        width={80}
                        alt=""
                    />
                    <h1>{'Omega IT Technologies news!'}</h1>
                </header>
                <div className={classes.Divider}></div>
                <main>
                    {articles?.length === 0 ? (
                        <Loader />
                    ) : (
                        articles?.map((article, index) => (
                            <ArticlePreview
                                title={article.title}
                                body={article.description}
                                key={article.id}
                                id={article.id}
                                date={article.date_of_creation}
                            />
                        ))
                    )}
                </main>
                <footer className={classes.footer}>
                    <Pagination
                        variant="outlined"
                        color="secondary"
                        size="large"
                        page={page}
                        onChange={pageHandler}
                        count={Math.ceil(maxArticles / 10)}
                    />
                </footer>
            </section>
        </main>
    );
};

export default App;
