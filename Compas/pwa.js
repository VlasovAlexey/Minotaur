// Copyright 2020, GUILLEUS Hugues <ghugues@netc.fr>
// BSD 3-Clause License

(async function () {
	if (!('serviceWorker' in navigator)) {
		console.warn('serviceWorker is not supported');
		return;
	}

	const pwdNeedNetwork = document.getElementById('pwdNeedNetwork').innerText;
	const pwdCurrentUpdate = document.getElementById('pwdCurrentUpdate').innerText;

	function register() {
		return navigator.serviceWorker.register('sw-cache.js');
	}
	let reg = await (navigator.serviceWorker.controller ?
		navigator.serviceWorker.getRegistration() :
		register());

	let pwaUpdate = document.getElementById('pwaUpdate');
	if (!pwaUpdate) {
		console.warn('There are not #pwaUpdate element.');
		return;
	}
	pwaUpdate.hidden = false;
	pwaUpdate.addEventListener('click', async () => {
		if (!navigator.onLine) {
			window.alert(pwdNeedNetwork);
			return;
		}
		document.body.innerText = pwdCurrentUpdate;
		await reg.unregister();
		await register();
		document.location.reload();
	});
})();

window.addEventListener('beforeinstallprompt', event => {
	let b = document.getElementById('pwaInstallation');
	if (!b) {
		console.warn("There are no #pwaInstallation element");
		return;
	}
	b.hidden = false;
	b.addEventListener('click', () => event.prompt().catch(console.error));
});
