var casper = require('casper').create(),
	signUrl = 'http://human.is.ncu.edu.tw/HumanSys/',
	portalId = '',
	portalPassword = '',
	action;

function signIn(acct, pwd) {
	action = 'signIn';
	portalId = acct;
	portalPassword = pwd;
	
	logInNcuHumanSystem();

	casper.run();
}

function signOut(acct, pwd) {
	action = 'signOut';
	portalId = acct;
	portalPassword = pwd;

	logInNcuHumanSystem();

	casper.run();
}

function logInNcuHumanSystem() {
	casper.start(signUrl, function () {
		this.waitForSelector('a[href="' + signUrl + '"]');
	});

	casper.then(function () {
		this.click('a[href="' + signUrl + '"]');
	});

	logInPortal(portalId, portalPassword);
}
/*
function logOutPortal(browser) {
	console.log('Try log out from portal');

	browser.visit(portalUrl).then(function () {
		browser.pressButton('a[href="/logout"]', function () {
			console.log('Logged out from NCU portal');
		});
	}).fail(function () {
		console.log('Log out from portal failed.');
	});
}
*/
function logInPortal(portalId, portalPassword) {
	console.log('Try log in into portal');

	casper.then(function () {
		this.waitForSelector('input[name="j_password"]');
	});

	casper.then(function () {
		this.fillSelectors('form[name="f"]', {
			'input[name="j_username"]': portalId,
			'input[name="j_password"]': portalPassword
		}, true);
	});
	
	casper.then(function () {
		console.log('Log in into portal succeeded.');
	});

	goToSignInOutPage();
}

function goToSignInOutPage() {
	var signInLink = 'a[href="http://human.is.ncu.edu.tw/HumanSys/student/stdSignIn"]',
		signInProject = 'a[href="stdSignIn/create?ParttimeUsuallyId=26627"]';

	casper.then(function () {
		this.waitForSelector(link);
	});

	casper.then(function () {
		this.click(link);
	});

	casper.then(function () {
		this.waitForSelector(signInProject);
	});

	casper.then(function () {
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
	var signInSelector = 'input[id="signin"]';

	casper.then(function () {
		this.waitForSelector(signInSelector);
	});

	casper.then(function () {
		var signInButton = document.querySelector(signInSelector);

		if (signInButton.disabled) {
			console.log('User "' + portalId + '" already signed in');	
		}
		else {
			this.click(signInSelector);
			console.log('User "' + portalId + '" successfully signed in');
		}
	});
}

function doSignOut() {
	var signOutSelector = 'input[id="signout"]',
		shouldSign = false;

	casper.then(function () {
		this.waitForSelector(signOutSelector);
	});

	casper.then(function () {
		var signOutButton = document.querySelector(signOutSelector);

		if (signOutButton.disabled) {
			console.log('User "' + portalId + '" already signed out');
		}
		else {
			this.fillSelectors('', {
				'textarea[id="AttendWork"]': '研究助理兼軟體開發'
			}, false);
			shouldSign = true;
		}
	});

	casper.then(function () {
		if (shouldSign) {
			this.click(signOutSelector);
			console.log('User "' + portalId + '" successfully signed out!');
		}
	});
}

module.exports = {
	signIn,
	signOut
};
