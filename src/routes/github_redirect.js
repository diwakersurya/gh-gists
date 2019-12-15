import axios from 'axios';
import { GITHUB_TOKEN_URL, GITHUB_USER_URL } from '../constants';
export async function get(req, res, next) {
    var codeToSend = req.query.code; //temporary code provided by github to get the access token
    try {
        const response = await axios.post(
            GITHUB_TOKEN_URL,
            {
                client_id: process.env.client_id,
                client_secret: process.env.client_secret,
                code: codeToSend
            },
            {
                headers: { Accept: 'application/json' }
            }
        );
        console.log(response.data);
        const { access_token } = response.data;
        console.log(access_token);
        //get the username and save it in the cache for later use
        const userResponse = await axios.get(GITHUB_USER_URL, {
            headers: {
                Authorization: `token ${access_token}`,
                Accept: 'application/json'
            }
        });
        const { login } = userResponse.data;
        req.session.user = login;
        req.session.token = access_token;
        res.redirect('/');
    } catch (ex) {
        throw ex;
    }
}
