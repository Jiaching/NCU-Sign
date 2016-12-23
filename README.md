# NCU-Sign
A [Casper.js](http://casperjs.org/) APP for automatically signing in / out from the [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/).

## Installation
1. Prepare a Linux OS
2. Install [NPM](https://www.npmjs.com/)
3. Install [PhantomJS](http://phantomjs.org/) globally via [NPM](https://www.npmjs.com/package/phantomjs)
4. Install [CasperJS](http://casperjs.org/) globally via [NPM](https://www.npmjs.com/package/casperjs)
5. Download this project or just download [ncu-sign.js](ncu-sign.js)
6. Here you go!

Usage: `casperjs ncu-sign.js [sign-in / sign-out] [YOUR-PORTAL-ID] [YOUR-PORTAL-PASSWORD] [JOB-ID]` (the job ID is stored in the "新增簽到" button of NCU Personnel System)
