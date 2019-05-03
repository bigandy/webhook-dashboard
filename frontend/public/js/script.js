var socket = io();
const sereneModeDivs = document.querySelectorAll('.serene-mode');

const findUserByUUID = uuid => {
	let name = '';
	switch(uuid) {
		case '9ba79ec8-26e3-4608-8282-3daab8656411':
			name = 'Andrew';
			break;
		default:
			name = 'Andrew';
	}
	return name;
}

socket.on('serene-mode', ({user, sereneMode}) => {
	// const user = findUserByUUID(uuid);

	console.log({user, sereneMode});

	const nameDiv = [...sereneModeDivs].filter(div => div.id === user)[0];

	// Update class and text depending on sereneMode status
	nameDiv.classList.remove('serene-mode--false');
	nameDiv.classList.remove('serene-mode--true');

	nameDiv.classList.add(`serene-mode--${sereneMode}`);
	nameDiv.querySelector('p span').textContent = sereneMode;
});

