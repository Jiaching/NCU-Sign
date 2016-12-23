var casper = require('casper').create({
        onTimeout: function () {
            console.log('Timed out: ' + this.getCurrentUrl());
        },
        onWaitTimeout: function () {
            console.log('Wait timed out: ' + this.getCurrentUrl());
        },
        onStepTimeout: function () {
            console.log('Step timed out: ' + this.getCurrentUrl());
        },
        viewportSize: { width: 1024, height: 768 }
    }),
    app = require('./app.js'),
    action = casper.cli.args[0],
    portalId = casper.cli.args[1],
    portalPassword = casper.cli.args[2],
    jobId = casper.cli.args[3],
    helpMessage = 'NCU-Sign usage:\nnode app.js ["sign-in" / "sign-out"] [PORTAL-ID] [PORTAL-PASSWORD] [JOB-ID]';

function checkArgs() {
    if (action !== 'sign-in' && action !== 'sign-out') {
        console.log('Unsupported action "' + action + '".\nThe action should be "sign-in" or "sign-out".');
        console.log(helpMessage);
        return false;
    }

    if (portalId === undefined || portalId === null || portalId.length === 0) {
        console.log('Please specify your portal ID');
        console.log(helpMessage);
        return false;
    }

    if (portalPassword === undefined || portalPassword === null || portalPassword.length === 0) {
        console.log('Please specify your portal password');
        console.log(helpMessage);
        return false;
    }

    if (jobId === undefined || jobId === null || jobId.length === 0) {
        console.log('Please specify the job ID for signing in / out');
        console.log(helpMessage);
        return false;
    }

    return true;
}

if (checkArgs()) {
    switch (action) {
        case 'sign-in':
            console.log('About to sign in into NCU Human System...');
            app.signIn(portalId, portalPassword, jobId);
            break;
        case 'sign-out':
            console.log('About to sign out from NCU Human System...');
            app.signOut(portalId, portalPassword, jobId);
            break;
        default:
            console.log('Unsupported action.\nThe action should be "sign-in" or "sign-out".');
    }
}
else {
    casper.exit();
}
