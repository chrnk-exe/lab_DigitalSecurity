const express = require('express');
const router = express.Router();
const _ = require('lodash');

const addArticle = require('../services/addArticle');
const addComment = require('../services/addComment');
const checkUserRules = require('../services/checkUserRules');
const checkUserName = require('../services/checkUserName');
const getUser = require('../services/getUser');
const recoveryPassword = require('../services/updatePassword');
const renameUser = require('../services/renameUser');
const deleteComment = require('../services/deleteComment');

router.get('/authorize', async (req, res) => {
    const { id } = req.session.session_token;
    if (id) {
        const user = await getUser(id);
        const result = {
            info: 'Success!',
            auth: true,
            id: user.id,
            name: user.login,
            isadmin: user.isadmin,
        };

        //lab logic
        if (user.isadmin) {
            result.flag = 'flag_@dm1n_account';
        }
        //lab logic

        res.json(result);
    } else {
        res.json({
            info: 'Unauthorized user.',
            auth: false,
        });
    }
});

router.get('/logout', async (req, res) => {
    req.session = null;
    res.status(200).end();
});

router.get('/userisadmin', async (req, res) => {
    const { id } = req.query;
    const userIsAdmin = await checkUserRules(id);
    res.json(userIsAdmin);
});

router.post('/comment', async function (req, res) {
    const { id, body, postId } = req.body;
    const result = await addComment(id, body, postId);
    res.json(result);
});

router.post('/check_user', async function (req, res) {
    const { name } = req.body;
    const resp = await checkUserName(name);
    if (resp) res.json({ name, info: 'Name is correct' });
    else res.json({ info: "User doesn't exist", name: null });
});

router.post('/recovery', async function (req, res) {
    const { name, password } = req.body;
    const userIsAdmin = await checkUserRules(name);
    if (userIsAdmin) {
        res.json({ password_changed: false });
    } else {
        const resp = await recoveryPassword(name, password);
        res.json({ password_changed: resp });
    }
});

router.post('/delete_comment', async function (req, res) {
    const { commentid, articleid } = req.body;
    const deleted = await deleteComment(commentid, articleid);
    if (deleted) {
        res.json({ deleted: true });
    } else {
        res.json({ delete: false });
    }
});

router.post('/change_name', async function (req, res) {
    const { id, name } = req.body;
    const userIsAdmin = await checkUserRules(id);
    if (userIsAdmin) {
        res.json({ name_changed: false });
    } else {
        let resp = await renameUser(id, name);
        res.json({ name_changed: resp });
    }
});

router.post('/create', async (req, res) => {
    const { userid, title, body, date, description } = req.body;
    const userIsAdmin = await checkUserRules(userid);
    if (userIsAdmin) {
        const info = { userid, title, body, description };
        let validDate = true;
        try {
            // lodash vulnerable here!
            _.merge(info, JSON.parse(date));
        } catch (err) {
            res.json({ info: 'date error' });
            validDate = false;
        }
        if ({}.flag && validDate) {
            _.merge({}, JSON.parse('{"__proto__": {"flag": false}}'));
            Object.__proto__.flag = undefined;
            res.json({ info: 'fl@g_Pro0toTyp3_1s_p0llu1ed!' });
        } else if (validDate) {
            addArticle(info);
            res.json({ status: true, info: 'article created' });
        }
    } else {
        res.json({ status: false, info: 'Access denied' });
    }
});

module.exports = router;
