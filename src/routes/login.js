export async function get(req, res, next) {
    const { CLIENT_ID } = process.env;
    res.redirect(
        `https://github.com/login/oauth/authorize?scope=gist%20user&client_id=${CLIENT_ID}`
    );
}
