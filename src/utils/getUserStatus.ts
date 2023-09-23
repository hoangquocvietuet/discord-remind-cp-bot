import { query_api } from './codeforces_api';

export async function getUserStatus(handle: string, from?: number, count?: number) {
    let params: string[] = [`handle=${handle}`];
    if (from) {
        params.push(`from=${from}`);
    }
    if (count) {
        params.push(`count=${count}`);
    }
    const response = await query_api('user.status', params);
    return response.result;
}