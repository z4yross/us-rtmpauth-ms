import amqp from 'amqplib/callback_api';

const QUEUE_URL = process.env.QUEUE_URL || 'localhost';

export const NTF_QUEUE = "notifications"

async function tryInitializeQueue() {
    try {
        const conn = await amqp.connect(`amqp://${QUEUE_URL}`);
        const channel = await conn.createChannel();

        return channel;
    } catch (error) {
        await sleep(10000);
        throw error
    }
}

export function initializeQueue() {
    while (true) {
        let channel = tryInitializeQueue().then(channel => channel).catch(error => console.log(error));
        if (channel) return channel;
        sleep()
    }
}

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

