// Copyright 2020, GUILLEUS Hugues <ghugues@netc.fr>
// BSD 3-Clause License

const assetsVersion = "v1.2";
const assets = [
	".",
	"compass.svg",
	"geo.js",
	"index.html",
	"index.fr.html",
	"index.en.html",
	"license.html",
	"icons/96.png",
	"icons/192.png",
	"icons/512.png",
	"icons/icon.svg",
	"manif.json",
	"pwa.js",
	"style.css",
];

if (!/^dev/.test(assetsVersion)) {
	self.addEventListener("install", event => event.waitUntil(
		caches.open(assetsVersion).then(c => c.addAll(assets))
	));

	self.addEventListener("install", () => caches.keys().then(list =>
		list
		.filter(c => c !== assetsVersion)
		.forEach(c => caches.delete(c))
	));

	self.addEventListener("fetch", event => event.respondWith(
		caches.match(event.request).then(rep => rep ||
			fetch(event.request).then(rep => {
				if (!rep.ok) throw new TypeError('Bad response status');
				caches.open(assetsVersion).then(c => c.put(event.request, rep));
				return rep.clone();
			}).catch(() => new Response("fetch error, maybe the navigator is offline.\n", {
				status: 404,
				statusText: "offline",
			}))
		)
	));
} else {
	self.addEventListener("install", () => caches.keys().then(list =>
		list.forEach(c => caches.delete(c))
	));
	self.addEventListener("fetch", event => event.respondWith(
		fetch(event.request)
	));
}
