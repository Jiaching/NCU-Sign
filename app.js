var signUrl = 'http://human.is.ncu.edu.tw/HumanSys/',
    logInUrl = 'http://human.is.ncu.edu.tw/HumanSys/login',
    portalId = '',
    portalPassword = '',
    jobId = '',
    action;

function main(acct, pwd, job) {
    portalId = acct;
    portalPassword = pwd;
    jobId = job;
    
    logInNcuHumanSystem();
    logInPortal(portalId, portalPassword);
    goToSignInOutPage();

    switch (action) {
        case 'signIn':
            doSignIn();
            break;
        case 'signOut':
            doSignOut();
            break;
        default:
            console.log("Unsupported action: " + action);
            casper.exit();
    }

    casper.run();
}

function logInNcuHumanSystem() {
    var logInLink = 'a[href="' + logInUrl + '"]';

    casper.start(signUrl, function () {
        console.log('Try to open NCU human system');
        this.waitForSelector(logInLink);
    });

    casper.then(function () {
        console.log('Try to click sign in button');
        
        this.click(logInLink);
    });
}

function logInPortal(portalId, portalPassword) {
    casper.then(function () {
        console.log('Try to log in into portal');
        this.waitForSelector('input[name="j_password"]');
    });

    casper.then(function () {
        console.log('Try to fill portal ID and password');
        this.fillSelectors('form[name="f"]', {
            'input[name="j_username"]': portalId,
            'input[name="j_password"]': portalPassword
        }, true);
    });
    
    casper.then(function () {
        console.log('Log in into portal succeeded!');
    });
}

function goToSignInOutPage() {
    var signInLink = 'a[href="http://human.is.ncu.edu.tw/HumanSys/student/stdSignIn"]',
        signInProject = 'a[href="stdSignIn/create?ParttimeUsuallyId=' + jobId + '"]';

    casper.then(function () {
        console.log('Wait for redirected back to NCU human system');
        this.waitForSelector(signInLink);
    });

    casper.then(function () {
        console.log('Try to click sign in link');
        this.click(signInLink);
    });

    casper.then(function () {
        this.waitForSelector(signInProject);
    });

    casper.then(function () {
        console.log('Try to click the project for signing in / out');
        this.click(signInProject);
    });
}

function doSignIn() {
    var signInSelector = 'input#signin';

    casper.then(function () {
        console.log('Wait for sign in page');
        this.waitForSelector(signInSelector);
    });

    casper.then(function () {
        console.log('Try to click sign in button');
        this.click(signInSelector);
        console.log('User "' + portalId + '" successfully signed in');
    });
}

function doSignOut() {
    var signOutSelector = 'input[id="signout"]',
        shouldSign = false;

    casper.then(function () {
        console.log('Wait for sign out page');
        this.waitForSelector(signOutSelector);
    });

    casper.then(function () {
        console.log('Try to fill work content text area');
        this.fillSelectors('table#sign_table', {
            'textarea#AttendWork': '研究助理兼軟體開發'
        }, false);
        shouldSign = true;
    });

    casper.then(function () {
        if (shouldSign) {
            console.log('Wait for sign in page');
            this.click(signOutSelector);
            console.log('User "' + portalId + '" successfully signed out!');
        }
    });
}

module.exports = {
    signIn: function (acct, pwd, jobId) {
        action = 'signIn';
        main(acct, pwd, jobId);
    },
    
    signOut: function (acct, pwd, jobId) {
        action = 'signOut';
        main(acct, pwd, jobId);
    }
};
