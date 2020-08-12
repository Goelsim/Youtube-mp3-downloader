const program = require("commander");
const Downloader = require('./downloader');
const ora = require('ora');
const progress = require('progress');

const spinner = ora('Downloading...').start();
spinner.color = 'yellow';
spinner.text = 'Downloading...';

program.version('0.0.1').description("A simple node-cli youtube mp3 downloader");

program.command('ytd')
    .requiredOption('-l, --link <link>', 'A youtube video link or id')
    .option('-n, --names [names]', 'Name of the downloaded file')
    .action((cmObj) => {
        let {link, names} = cmObj;
        Downloader.download(link, names)
            .then(finishedObj => {
                //console.log("Succeeded.")
                spinner.succeed(`Finished downloading..."${finishedObj.videoTitle}" in ${finishedObj.stats.runtime} seconds`);
            }).catch(err => {
                //console.log("Failed.")
                spinner.fail("Sorry! Could not download that file. Error occurred.")
                console.log(err);
        });

        Downloader.downloader.on('progress', function (progressObj) {
            spinner.text = `${Number(progressObj.progress.percentage).toFixed(2)}% done`;
        })
    });

program.parse(process.argv);