# NCU-Sign
A [Casper.js](http://casperjs.org/) APP for automatically signing in / out from the [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/). The following tutorial is based on the [Ubuntu](https://www.ubuntu.com/) system.

## Installation
1. Prepare a [Ubuntu](https://www.ubuntu.com/) OS
2. Install [NPM](https://www.npmjs.com/): `sudo apt-get -y install npm`
3. Install [PhantomJS](http://phantomjs.org/): `npm install -g phantomjs`
4. Install [CasperJS](http://casperjs.org/): `npm install -g casperjs`
5. Install `cron`: `sudo apt-get -y install cron`
6. Start `cron`: `cron -f -L 15`
7. Download this project

If you're using [Docker](https://www.docker.com/), there's a [docker-compose.yml](docker-compose.yml) file. However, additional installation steps are required:

1. Install [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)
2. `cd <PATH-TO-THE-NCU-SIGN-PROJECT>`
3. `docker-compose up -d`
4. `docker exec -it NCU-Sign bash`
5. `dpkg-reconfigure tzdata`
6. Choose the correct timezone for you
7. `apt-get update && apt-get -y upgrade`
8. `apt-get install -y supervisor`
9. `apt-get install -y cron`
10. `apt-get autoclean && apt-get -y autoremove`
11. `vim /etc/supervisor/conf.d/cron-worker.conf`
12. Type in following configuration then save and exit the file:

  ```
  [program:cron-worker]
  command=/usr/sbin/cron -f -L 15
  autostart=true
  autorestart=true
  ```
17. `service supervisor start`
18. `supervisorctl reread`
19. `supervisorctl update`
20. `supervisorctl start cron-worker`

## Usage
Try sign in / sign out from [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/) first time:
```
casperjs ncu-sign.js [sign-in / sign-out] [YOUR-PORTAL-ID] [YOUR-PORTAL-PASSWORD] [JOB-ID]
```
(the job ID is stored in the "新增簽到" button of NCU Personnel System)

For example: `casperjs /NCU-Sign/app/ncu-sign.js sign-in 100502507 MY-COOL-PASSWORD 26627`

If the above command works, you should see you're already signed in / signed out from the [NCU Personnel System](http://human.is.ncu.edu.tw/HumanSys/).

Now, there's a [cron.example](exec/cron.example) file under the `exec` directory. It shows an example setup for executing sign in / sign out tasks each day. Feel free to edit this file to meet your needs.

After you've completed your own crontab file, install `cron` and then add these cron jobs you've just completed for daily sign in / sign out:
```
crontab [PATH-TO-YOUR-CRONTAB-FILE]
```
Everything done! Enjoy your efficient life!
