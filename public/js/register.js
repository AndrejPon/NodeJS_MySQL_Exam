const URL = 'http://localhost:3000/register';
const formEl = document.forms.register;
const errorsContainerEl = document.querySelector('.errors');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const {
    fullname, email, password, repeatpassword,
  } = formEl;
  console.log(formEl);
  if (password.value !== repeatpassword.value) return;
  const regUserData = {
    fullname: formEl.elements.fullname.value,
    email: formEl.elements.email.value,
    password: formEl.elements.password.value,
  };

  regUser(regUserData, errorsContainerEl);
});

async function regUser(regUserData) {
  const resp = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(regUserData),
  });
  const respInJs = await resp.json();
  if (respInJs.success === false) {
    handleErrors(respInJs.error);
    return false;
  }
  if (respInJs.success === true) {
    console.log('respInJs.success===3', respInJs);
    window.location.replace(`login.html?email=${regUserData.email}`);
  }
}
function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  console.log('erorrArray ===', erorrArray);
  erorrArray.details.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}
