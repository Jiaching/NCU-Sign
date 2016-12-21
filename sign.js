var Browser = require('zombie'),
	portalUrl = 'https://portal.ncu.edu.tw',
	portalAlreadyLoggedInUrl = 'https://portal.ncu.edu.tw/system/120',
	portalRequireLogInUrl = 'https://portal.ncu.edu.tw/login',
	signUrl = 'http://human.is.ncu.edu.tw/HumanSys/',
	portalId = '',
	portalPassword = '',
	browser = new Browser({ waitDuration: 10000 }),
	action;

function signIn(acct, pwd) {
	action = 'signIn';
	portalId = acct;
	portalPassword = pwd;
	logInNcuHumanSystem();
}

function signOut(acct, pwd) {
	action = 'signOut';
	portalId = acct;
	portalPassword = pwd;
	logInNcuHumanSystem();
}

function logInNcuHumanSystem() {
	browser.visit('http://human.is.ncu.edu.tw/HumanSys/').then(function () {
		browser.clickLink('a[href="http://human.is.ncu.edu.tw/HumanSys/login"]', function () {
			logInPortal(portalId, portalPassword);
		});
	});
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
	browser.wait(function () {
		browser.
		fill('j_username', portalId).
		fill('j_password', portalPassword).
		pressButton('Login', function () {
			console.log('Log in into portal succeeded.');
			browser.wait().then(goToSignInOutPage);
		});
	});
}

function goToSignInOutPage() {
	browser.wait(function () {
		browser.clickLink('a[href="http://human.is.ncu.edu.tw/HumanSys/student/stdSignIn"]', function () {
			browser.wait(function () {
				browser.clickLink('a[href="stdSignIn/create?ParttimeUsuallyId=26627"]', function () {
					browser.wait(function () {
						switch (action) {
							case 'signIn':
								browser.wait(doSignIn);
								break;
							case 'signOut':
								browser.wait(doSignOut);
								break;
							default:
								console.error("Unsupported action: " + action);
						}
					});
				});
			});
		});
	});
}

function doSignIn() {
	if (browser.query('input[id="signin"]').disabled) {
		console.log('User "' + portalId + '" already signed in');
	}
	else {
		browser.pressButton('input[id="signin"]', function () {
			console.log('User "' + portalId + '" successfully signed in');
		});
	}
}

function doSignOut() {
	if (browser.query('input[id="signout"]').disabled) {
		console.log('User "' + portalId + '" already signed out');
	}
	else {
		browser.
		fill('textarea[id="AttendWork"]', '研究助理兼軟體開發').
		pressButton('input[id="signout"]', function () {
			console.log('User "' + portalId + '" successfully signed out!');
		});
	}
}

module.exports = {
	signIn,
	signOut
};
