# NCU-Sign
A [Casper.js](http://casperjs.org/) APP for automatically signing in / out from the [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/).

## Installation
1. Prepare a Linux OS
2. Install [NPM](https://www.npmjs.com/)
3. Install [PhantomJS](http://phantomjs.org/) globally via [NPM](https://www.npmjs.com/package/phantomjs)
4. Install [CasperJS](http://casperjs.org/) globally via [NPM](https://www.npmjs.com/package/casperjs)
5. Download this project or just download [ncu-sign.js](ncu-sign.js)

## Usage
Try sign in / sign out from [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/) first time:
```
casperjs ncu-sign.js [sign-in / sign-out] [YOUR-PORTAL-ID] [YOUR-PORTAL-PASSWORD] [JOB-ID]
```
(the job ID is stored in the "新增簽到" button of NCU Personnel System)

If the above command works, you should see you're already signed in / signed out from the [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/).

Now, there's a [cron.example](exec/cron.example) file under the `exec` directory. It shows an example setup for executing sign in / sign out tasks each day. Feel free to edit this file to meet your needs.

After you've completed your own crontab file, install `cron` and then add these cron jobs you've just completed for daily sign in / sign out. For example, in Ubuntu:
```
sudo apt-get install -y cron
cron -f -L 15
crontab [PATH-TO-YOUR-CRONTAB-FILE]
```

Everything done! Enjoy your efficient life!
