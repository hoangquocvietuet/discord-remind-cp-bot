export async function getUrlOfProblem(problem: any) {
    const { contestId, index } = problem;
    const url = `https://codeforces.com/contest/${contestId}/problem/${index}`;
    return url;
}