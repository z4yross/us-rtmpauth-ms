export function sendStreamNotification(channel, queue, userid, state){
    const msg = {
        userid: userid,
        state: state
    }

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
}