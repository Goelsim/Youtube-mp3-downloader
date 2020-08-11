const YouTubeMp3Downloader = require('youtube-mp3-downloader');
const { isURL } = require("./helpers.js");
let url = require('url');

const downloader = new YouTubeMp3Downloader({
    ffmpegPath: "/usr/bin/ffmpeg",
    outputPath: "/home/simran/Music",
    youtubeVideoQuality: 'highest',
    queueParallelism: 3,
    progressTimeout: 1000
});

module.exports = {
    download: function(videoIdOrLink, fileName) {
        return new Promise(((resolve, reject) => {
            if(!videoIdOrLink) {
                throw new Error("Please enter a valid id or link")
            }
            let videoId = videoIdOrLink;
            if(isURL(videoIdOrLink)) {
                let urlQueryObj = url.parse(videoIdOrLink, true).query
                videoId = urlQueryObj.v;
            }
            downloader.download(videoId, fileName);
            downloader.on('finished', function(err, data) {
                resolve(data);
            });
        }))
    },
    downloader
};