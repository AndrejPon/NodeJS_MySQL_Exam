const URL = 'http://localhost:3000/login';
const formEl = document.forms.login;
const errorsContainerEl = document.querySelector('.errors');

const query = window.location.search;
if (query) {
  const usernameFromQuery = query.split('=')[1];
  formEl.elements.email.value = usernameFromQuery;
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  // console.log('js is in control');
  const loginUserData = {
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
  };
  console.log('loginUser ===', loginUserData);

  loginUser(loginUserData);
});

async function loginUser(loginUserData) {
  const resp = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginUserData),
  });

  const respInJs = await resp.json();
  console.log('respInJs ===', respInJs);
  if (respInJs.success === false) {
    handleErrors(respInJs.error);
    // return false;
  }
  if (respInJs.success === true) {
    // console.log('respInJs ===', respInJs);
    localStorage.setItem('login_token', respInJs.data);
    window.location.replace('groups.html');
  }
}
function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  console.log('erorrArray ===', erorrArray);
  erorrArray.details.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}
