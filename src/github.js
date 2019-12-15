import Octokit from '@octokit/rest';
export default function githubClient(accessToken) {
    return new Octokit({
        auth: `${accessToken}`
    });
}

export async function getGists(client) {
    return client.gists.list();
}
export async function getGist(client, gistId) {
    return client.gists.get({
        gist_id: gistId
    });
}
