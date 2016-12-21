var action = process.argv[2],
	portalId = process.argv[3],
	portalPassword = process.argv[4],
	sign = require('./sign.js');

if (!action) {
	console.error('NCU-Sign usage:\nnode app.js ["sign-in" / "sign-out"] [PORTAL-ID] [PORTAL-PASSWORD].');
	return;
}

if (portalId === undefined || portalId === null || portalId.length === 0) {
	console.error('Please specify your portal ID');
	return;
}

if (portalPassword === undefined || portalPassword === null || portalPassword.length === 0) {
	console.error('Please specify your portal password');
	return;
}

switch (action) {
	case 'sign-in':
		sign.signIn(portalId, portalPassword);
		break;
	case 'sign-out':
		sign.signOut(portalId, portalPassword);
		break;
	default:
		console.error('Unsupported action.\nThe action should be "sign-in" or "sign-out".');
}
