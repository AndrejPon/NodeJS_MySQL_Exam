const URL = 'http://localhost:3000/accounts';
const errorsContainerEl = document.querySelector('.errors');

const groupsContainerEl = document.querySelector('.groups-container');
async function getAllGroups() {
  const token = localStorage.getItem('login_token');
  const resp = await fetch(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const jsData = await resp.json();
  // console.log('jsData ===', jsData);
  if (jsData.success === false) {
    window.location.replace('login.html');
  }
  renderGroups(jsData.data, groupsContainerEl);
}

function renderGroups(groupsArr, dest) {
  dest.innerHTML = '';
  // console.log('renderGroups ===', renderGroups);
  // console.log('groupsArr ===', groupsArr);
  groupsArr.forEach(({ group_id, name }) => {
    dest.innerHTML += `
    <article class="single-group">
        <h2 class="group-id">ID: ${group_id}</h2>
        <p>${name}</p>
    </article>
    `;
  });
}

const formEl = document.forms.addgroup;

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const newGroupObj = {
    group_id: formEl.elements.groupid.value,
  };
  // console.log('newGroupObj ===', newGroupObj);
  createNewGroup(newGroupObj);
});

async function createNewGroup(newGroupObj) {
  const token = localStorage.getItem('login_token');
  if (token === null) throw new Error('token not found');

  const resp = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newGroupObj),
  });
  const dataInJs = await resp.json();
  // console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    getAllGroups();
  } else {
    handleError();
  }
}

function handleSuccess() {
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  alertEl.textContent = 'New group added';
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);

  formEl.reset();
}

function handleErrors(erorrArray) {
  errorsContainerEl.innerHTML = '';
  console.log('erorrArray ===', erorrArray);
  erorrArray.details.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}
getAllGroups();
