import { Client, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import { getUserStatus } from './utils/getUserStatus';
import { getProblemSet } from './utils/getProblemSet';
import { getUrlOfProblem } from './utils/getUrlOfProblem';
config();

const DISCORD_TOKEN = process.env.DISCORD_TOKEN as any;
const DISCORD_CHANNEL_ID = process.env.DISCORD_CHANNEL_ID as any;
const client: Client = new Client();


client.on('ready', () => {
    console.log(`Bot is ready as: ${client.user?.tag}`);
});

function makeUser(handle: string, name: string, discordUserID: string, done: boolean = false, problem: any = null) {
    return {
        name,
        handle,
        discordUserID,
        done,
        problem
    }
}

async function main() {
    await client.login(DISCORD_TOKEN);

    let channel: TextChannel | undefined;
    try {
        const fetchedChannel = await client.channels.fetch(DISCORD_CHANNEL_ID)
        channel = fetchedChannel as TextChannel;
    } catch (err) {
        console.error;
    }

    const users = [
        makeUser('trungnotchung', 'Trung', '726809286659014737'),
        makeUser('Lihwy', 'Việt', '718831435896717413'),
        makeUser('Loilon504', 'Lợi', '678955436451561473')
    ];

    const allProblems = await getProblemSet();
    const filterProblemSet = allProblems.problems.filter((problem: any) => {
        return problem.rating !== undefined && problem.rating >= 1900 && problem.rating <= 2500;
    });
    setInterval(async () => {
        await users.forEach(async (user: any) => {
            if (user.done === true) {
                return;
            }

            if (user.problem === null) {
                user.done = 0;
                const userStatus = await getUserStatus(user.handle);

                let candidatesProblems: any[] = [];
                await filterProblemSet.forEach(async (problem: any) => {
                    const isSolved = await userStatus.some((status: any) => {
                        return status.problem.name === problem.name && status.verdict === 'OK';
                    });
                    if (!isSolved) {
                        candidatesProblems.push(problem);
                    }
                });

                const randomIndex = await Math.floor(Math.random() * candidatesProblems.length);
                const randomProblem = candidatesProblems[randomIndex];
                user.problem = randomProblem;
                const url = await getUrlOfProblem(randomProblem);
                channel?.send(`Đây là bài cho <@${user.discordUserID}>: (${url})`);
            } else {
                const userStatus = await getUserStatus(user.handle);
                const isSolved = await userStatus.some((status: any) => {
                    return status.problem.name === user.problem.name && status.verdict === 'OK';
                });
                if (isSolved) {
                    user.done = true;
                    user.problem = null;
                } else {
                    channel?.send(`Ê ${user.name}, đã làm bài chưa???? <@${user.discordUserID}>`);
                }
            }
        });
    }, 1000 * 60);
};

main();