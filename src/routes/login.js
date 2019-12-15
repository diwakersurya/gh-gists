export async function get(req, res, next) {
    res.redirect(
        `https://github.com/login/oauth/authorize?scope=gist%20user&client_id=${process.env.client_id}`
    );
}
