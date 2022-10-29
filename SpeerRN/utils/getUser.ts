import {Octokit} from '@octokit/rest';

export async function getUserOctokit(login: string) {
  const octokit = new Octokit({});
  return await octokit.request('GET /users/{login}', {
    login: login,
  });
}
