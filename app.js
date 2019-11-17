global.Cushion = require('cushiondb-client');

window.addEventListener('DOMContentLoaded', () => {
	const cushion = new Cushion();

	app = new Vue({
		el: '#app-1',
		data: {
			notes: [],
			signedIn: false
		},
		methods: {
			saveNote: function() {
				const input = document.getElementById('note-input');
				cushion.store.set({
					text: input.value
				}).then(id => {
					getAllNotes();
				});
			},
			logIn: function() {
				cushion.account.signIn({username: "danielR", password: "pass"}).then(r => {
					if (r.status === 'success') {
						app.signedIn = true;
						getAllNotes();
					}
				});
			},
			logOut: function() {
				cushion.account.signOut().then(r => {
					if (r.status === 'success') {
						app.signedIn = false;
						app.notes = [];
					}
				});
			},
			subscribe: function() {
				cushion.account.subscribeToNotifications().then(r => console.log(r));
			}
		}
	});

	const getAllNotes = () => {
		cushion.store.getAll().then(notes => app.notes = notes);
	}
	
	cushion.ready.then(() => {
		cushion.account.isSignedIn().then(r => {
			if (r) {
				app.signedIn = true;
				getAllNotes();
			}
		});
	});
});
