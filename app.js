var Browser = require('zombie'),
	portalUrl = 'https://portal.ncu.edu.tw',
	portalAlreadyLoggedInUrl = 'https://portal.ncu.edu.tw/system/120',
	portalRequireLogInUrl = 'https://portal.ncu.edu.tw/login',
	signUrl = 'http://human.is.ncu.edu.tw/HumanSys/',
	portalId = '',
	portalPassword = '',
	browser = new Browser();

function doSign() {
	browser.visit(portalUrl).then(function () {
		logInNcuHumanSystem(browser);
	});
}

function logInNcuHumanSystem(browser) {
	browser.visit('http://human.is.ncu.edu.tw/HumanSys/').then(function () {
		browser.clickLink('a[href="http://human.is.ncu.edu.tw/HumanSys/login"]', function () {
			logInPortal(browser, portalId, portalPassword);
		});
	});
}

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

function logInPortal(browser, portalId, portalPassword) {
	console.log('Try log in into portal');

	browser.
	fill('j_username', portalId).
	fill('j_password', portalPassword).
	pressButton('Login', function () {
		console.log('Log in into portal succeeded.');
		goToSignInOutPage(browser);
	});
}

function goToSignInOutPage(browser) {
	browser.clickLink('a[href="http://human.is.ncu.edu.tw/HumanSys/student/stdSignIn"]', function () {
		browser.clickLink('a[href="stdSignIn/create?ParttimeUsuallyId=26627"]', function () {
			if (browser.query('input[id="signin"]').disabled) {
				signOut(browser);
			}
			else if (browser.query('input[id="signout"]').disabled) {
				signIn(browser);
			}
			else {
				console.error('NCU system may broken...');
			}
		});
	});
}

function signIn(browser) {
	if (browser.query('input[id="signin"]').disabled) {
		console.log('User "' + portalId + '" already signed in');
	}
	else {
		browser.pressButton('input[id="signin"]', function () {
			browser.fill('AttendWork', '研究助理兼軟體開發');
			console.log('User "' + portalId + '" successfully signed in!');
		});
	}
}

function signOut(browser) {
	if (browser.query('input[id="signout"]').disabled) {
		console.log('User "' + portalId + '" already signed out');
	}
	else {
		browser.
		fill('AttendWork', '研究助理兼軟體開發').
		pressButton('input[id="signout"]', function () {
			console.log('User "' + portalId + '" successfully signed out!');
			console.log(browser.location.href);
		});
	}
}

module.exports = doSign;