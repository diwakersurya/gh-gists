import sirv from 'sirv';
import polka from 'polka';
import compression from 'compression';
import * as sapper from '@sapper/server';
import dotenv from 'dotenv';
import session from 'express-session';
import sessionFileStore from 'session-file-store';
const FileStore = sessionFileStore(session);
import { redirect, cookies, authorisation } from './middlewares';

const { PORT, NODE_ENV, CLIENT_ID } = process.env;
const prod = NODE_ENV === 'production';
const dev = NODE_ENV === 'development';

if (!prod) {
    //setup dotenv for non prod environments
    dotenv.config();
}

polka() // You can also use Express
    .use(
        session({
            secret: 'conduit',
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 31536000
            },
            store: new FileStore({
                path: `.sessions`
            })
        })
    )
    .use(cookies)
    .use(redirect)
    .use('/', (req, res, next) => {
        if (req.session.token && req.path === '/') {
            res.redirect('/gists');
        }
        next();
    })
    .use('/gists', authorisation)
    .use(
        compression({ threshold: 0 }),
        sirv('static', { dev }),
        sapper.middleware()
    )
    .listen(PORT, err => {
        if (err) console.log('error', err);
    });
