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
	action = casper.cli.args[0],
	portalId = casper.cli.args[1],
	portalPassword = casper.cli.args[2];

function checkArgs() {
	if (action !== 'sign-in' && action !== 'sign-out') {
		console.log('Unsupported action "' + action + '".\nThe action should be "sign-in" or "sign-out".');
		console.log('NCU-Sign usage:\nnode app.js ["sign-in" / "sign-out"] [PORTAL-ID] [PORTAL-PASSWORD].');
		casper.exit();
	}

	if (portalId === undefined || portalId === null || portalId.length === 0) {
		console.log('Please specify your portal ID');
		console.log('NCU-Sign usage:\nnode app.js ["sign-in" / "sign-out"] [PORTAL-ID] [PORTAL-PASSWORD].');
		casper.exit();
	}

	if (portalPassword === undefined || portalPassword === null || portalPassword.length === 0) {
		console.log('Please specify your portal password');
		console.log('NCU-Sign usage:\nnode app.js ["sign-in" / "sign-out"] [PORTAL-ID] [PORTAL-PASSWORD].');
		casper.exit();
	}
}

var sign = (function () {
	var signUrl = 'http://human.is.ncu.edu.tw/HumanSys/',
		logInUrl = 'http://human.is.ncu.edu.tw/HumanSys/login',
		portalId = '',
		portalPassword = '',
		action;

	function main(acct, pwd) {
		portalId = acct;
		portalPassword = pwd;
		
		logInNcuHumanSystem();

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

		logInPortal(portalId, portalPassword);
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

		goToSignInOutPage();
	}

	function goToSignInOutPage() {
		var signInLink = 'a[href="http://human.is.ncu.edu.tw/HumanSys/student/stdSignIn"]',
			signInProject = 'a[href="stdSignIn/create?ParttimeUsuallyId=26627"]';

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

		switch (action) {
			case 'signIn':
				doSignIn();
				break;
			case 'signOut':
				doSignOut();
				break;
			default:
				console.error("Unsupported action: " + action);
		}
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

	return {
		signIn: function (acct, pwd) {
			action = 'signIn';
			main(acct, pwd);
		},
		
		signOut: function (acct, pwd) {
			action = 'signOut';
			main(acct, pwd);
		}
	};
})();

checkArgs()

switch (action) {
	case 'sign-in':
		console.log('About to sign in into NCU Human System...');
		sign.signIn(portalId, portalPassword);
		break;
	case 'sign-out':
		console.log('About to sign out from NCU Human System...');
		sign.signOut(portalId, portalPassword);
		break;
	default:
		console.error('Unsupported action.\nThe action should be "sign-in" or "sign-out".');
}
