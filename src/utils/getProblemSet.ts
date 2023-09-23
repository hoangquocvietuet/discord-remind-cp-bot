import { query_api } from "./codeforces_api";

export async function getProblemSet(tag?: Array<string>, problemsetName?: string) {
    let params: string[] = [];
    if (tag) {
        params.push(`tags=${tag.join(';')}`);
    }
    if (problemsetName) {
        params.push(`problemsetName=${problemsetName}`);
    }
    const response = await query_api('problemset.problems', params);
    return response.result;
}