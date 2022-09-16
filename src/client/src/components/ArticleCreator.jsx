import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux/es/exports';
import {
    ThemeProvider,
    Button,
    Select,
    MenuItem,
    TextField,
    InputLabel,
} from '@mui/material';

import formatDate from '../assets/formatDate';
import host from '../data/host';

import styles from '../styles/ArticleCreator.module.css';
import classes from '../styles/MyArticle.module.css';
import greenTheme from '../UI/theme';

const TextEditor = React.lazy(() => import('../UI/TextEditor'));

const ArticleCreator = () => {
    const [article, setArticle] = useState({
        title: '',
        description: '',
        body: '',
        customDate: '',
    });
    const [showDateInput, setShowDateInput] = useState(false);
    const { id, user } = useSelector(state => state.user);
    const navigator = useNavigate();

    const addNewArticle = async e => {
        e.preventDefault();
        let date = new Date();
        date = showDateInput
            ? article.customDate
            : `{"year": ${date.getFullYear()}, "month": ${
                  date.getMonth() + 1
              }, "day": ${date.getDate()}}`;
        const requestBody = {
            title: article.title,
            body: article.body,
            userid: id,
            description: article.description,
            date,
        };
        const resp = await fetch(`http://${host}/api/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(requestBody),
        });
        const respBody = await resp.json();
        alert(respBody.info);
        if (respBody !== 'date error') navigator('/');
    };

    const handleInput = e => {
        setShowDateInput(e.target.value);
    };

    if (user !== 'admin') {
        return <div>Access denied!</div>;
    } else {
        return (
            <div className={classes.articlePage}>
                <article className={classes.articleContainer}>
                    <header
                        className={[
                            classes.articleHeader,
                            classes.articleContainerItem,
                        ].join(' ')}>
                        <h1>
                            Title:
                            <input
                                className={styles.title}
                                placeholder="Awesome title!"
                                value={article.title}
                                onChange={e =>
                                    setArticle({
                                        ...article,
                                        title: e.target.value,
                                    })
                                }
                            />
                        </h1>
                    </header>
                    <div className={classes.articleContainerItem}>
                        <h2>Short article description</h2>
                        <textarea
                            rows={3}
                            cols={60}
                            value={article.description}
                            onChange={e =>
                                setArticle({
                                    ...article,
                                    description: e.target.value,
                                })
                            }
                            placeholder="description"
                        />
                    </div>
                    <div className={classes.articleContainerItem}>
                        <InputLabel id="date-label">Date</InputLabel>
                        <Select
                            labelId={'date-label'}
                            defaultValue={false}
                            onChange={handleInput}>
                            <MenuItem value={false}>Auto</MenuItem>
                            <MenuItem value={true}>Input</MenuItem>
                        </Select>
                        <TextField
                            disabled={!showDateInput}
                            placeholder={formatDate(new Date())}
                            style={{ marginLeft: '10px' }}
                            value={
                                showDateInput
                                    ? article.customDate
                                    : formatDate(new Date())
                            }
                            onChange={e =>
                                setArticle({
                                    ...article,
                                    customDate: e.target.value,
                                })
                            }
                        />
                    </div>
                    <main className={classes.articleContainerItem}>
                        <div>
                            <TextEditor
                                setText={text =>
                                    setArticle({ ...article, body: text })
                                }
                            />
                        </div>
                    </main>
                    <footer className={classes.articleContainerItem}>
                        <ThemeProvider theme={greenTheme}>
                            <Button variant="contained" onClick={addNewArticle}>
                                Post new article!
                            </Button>
                        </ThemeProvider>
                    </footer>
                </article>

                <section
                    className={classes.suggestedPosts}
                    style={{ visibility: 'hidden' }}>
                    <header>Choose suggested posts</header>
                    <div>Coming soon...</div>
                </section>
            </div>
        );
    }
};

export default ArticleCreator;
