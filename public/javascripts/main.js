// USERS ===========================================================================

// Get Register
const form = document.getElementById('reg-form')
			form.addEventListener('submit', registerUser)

			async function registerUser(event) {
				event.preventDefault()
				const username = document.getElementById('username').value
				const password = document.getElementById('password').value

				await fetch('/../users', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						username,
						password
					})
				}).then((res) => res.json())
      }

  // GET log in
const logform = document.getElementById('login')
logform.addEventListener('submit', login)

async function login() {
  console.log('Le log est capté')
  const username = document.getElementById('logusername').value
  const password = document.getElementById('logpassword').value

   var result = await fetch('/../login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  }).then((res) => res.json())

  if(result.status ==='ok') {
    console.log(result.loguser)
  }
}

// Log Out
const logoutform = document.getElementById('logout')
logoutform.addEventListener('submit', logout)

async function logout() {
  await fetch('/../logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((res) => res.json())
}

// SESSION===============================================================================


// CHAT ===============================================================================
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

const socket = io();

// Message from server
socket.on('message', message =>{
  console.log(message);
  outputMessage(message);

  // Scroll down
  chatMessages.scrolltop = chatMessages.scrollHeight;


});

// Message submit
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();

});

// Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class="meta"> ${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);
}