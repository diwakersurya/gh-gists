import githubClient, { getGists } from '../../github';
export async function get(req, res, next) {
    console.log('++++++\n\n', req.session.token, req.path);
    const response = await getGists(githubClient(req.session.token));
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.data));
}
