import githubClient, { getGist } from '../../github';
export async function get(req, res, next) {
    const response = await getGist(
        githubClient(req.session.token),
        req.params.gistid
    );
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response.data));
}
