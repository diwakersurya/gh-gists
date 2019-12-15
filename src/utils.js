export function parseCookies(cookieStr) {
    return cookieStr
        .split(';')
        .map(cookieItem => cookieItem.trim())
        .map(cookieItem => {
            const [cookieName, ...cookieValue] = cookieItem.split('=');
            return {
                [cookieName]: Array.isArray(cookieValue)
                    ? cookieValue.join('=')
                    : cookieValue
            };
        })
        .reduce((cookies, cookieItemObj) => {
            cookies = { ...cookies, ...cookieItemObj };
            return cookies;
        }, {});
}

export function isLoggedIn(req) {
    return typeof req.token !== 'undefined';
}
