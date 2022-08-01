const TwitchApi = require('./index.js');
const twitchApi = new TwitchApi('client_id', 'client_secret');

(async () => {
    const broadcaster = await twitchApi.getBroadcaster('paulinholokobr');
    console.log("broadcaster", broadcaster);

    //const channel_info = await twitchApi.getChannelInfo(broadcaster.id);
    //console.log("channel_info", channel_info);

    const streams = await twitchApi.getStreamsStatus(broadcaster.id);
    console.log("streams", streams);

    //onst videos = await twitchApi.getVideos(broadcaster.id);
    //console.log("videos", videos);
})();