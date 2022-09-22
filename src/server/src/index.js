const express = require('express');
const cors = require('cors');
const cookieSession = require('cookie-session');

const private = require('./routes/private');
const public = require('./routes/public');
const path = require('path');
const authController = require('./controllers/authcontroller');

require('dotenv').config({ path: path.resolve('../', '.env') });

const app = express();
const port = 5000;

app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(
    cookieSession({
        name: 'session',
        keys: ['session_token'],
        // Cookie Options
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        httpOnly: false,
        // signed: false,
        sameSite: 'lax',
        secure: false,
    }),
);

app.use(express.static(path.resolve(__dirname, '../../../build')));
// app.use((req, res, next) => {
//     console.log(req.url)
//     next()
// })
// app.use(express.static(path.resolve(__dirname, '../../../local')));


app.use(public);
app.use('/api', authController, private);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
    // res.sendFile(path.resolve(__dirname, '../../../local', 'index.html'));
});

app.listen(port, () => {
    console.log(`[server]: App listening on port ${port}`);
});
