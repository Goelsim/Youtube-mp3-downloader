const YouTubeMp3Downloader = require('youtube-mp3-downloader');
const downloader = new YouTubeMp3Downloader({
    ffmpegPath: "/usr/bin/ffmpeg",
    outputPath: "/home/simran/Music",
    youtubeVideoQuality: 'highest',
    queueParallelism: 3,
    progressTimeout: 1000
});