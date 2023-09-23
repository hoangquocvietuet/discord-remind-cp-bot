const API_BASE_URL = 'https://codeforces.com/api/'
const CONTEST_BASE_URL = 'https://codeforces.com/contest/'
const CONTESTS_BASE_URL = 'https://codeforces.com/contests/'
const GYM_BASE_URL = 'https://codeforces.com/gym/'
const PROFILE_BASE_URL = 'https://codeforces.com/profile/'
const ACMSGURU_BASE_URL = 'https://codeforces.com/problemsets/acmsguru/';

export async function query_api(method: string, params: Array<string>) {
    const url = API_BASE_URL + method + '?' + params.join('&');
    try {
        const response = await fetch(url);
        const responseJson = await response.json();
        if (responseJson.status !== "OK") {
            throw new Error(responseJson.status);
        }
        return responseJson;
    } catch (error) {
        throw error;
    }
}