import { parseCookies } from './utils';
import githubClient from './github';
export function redirect(req, res, next) {
    // mutate req; available later
    res.redirect = function(url) {
        res.writeHead(302, {
            Location: url
        });
        return res.end();
    };
    next();
}
export function cookies(req, res, next) {
    // mutate req; available later
    const cookieHeaderName = 'Set-Cookie';
    res.cookie = function(name, value) {
        const existingCookies = res.getHeader(cookieHeaderName) || null;
        const newCookie = `${name}=${value}`;
        res.setHeader(
            cookieHeaderName,
            existingCookies !== null
                ? [existingCookies, newCookie]
                : [newCookie]
        );
    };
    //parse and set req cookies
    const cookieString = req.headers['cookie'] || null;
    if (cookieString !== null) {
        const cookies = parseCookies(cookieString);
        req.cookies = cookies;
    }
    next();
}

function isProtectedRoute(path, loginPath, exclude = [], addInfo) {
    return path !== loginPath && path !== 'github_redirect';
}
export function authorisation(req, res, next) {
    const { token = null } = req.session;
    if (token === null) {
        //that means user is not logged in, redirect to login route if path !== "/"
        return res.redirect('/login');
    }
    next();
}
