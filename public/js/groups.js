const URL = 'http://localhost:3000/accounts';
const errorsContainerEl = document.querySelector('.errors');

const groupsContainerEl = document.querySelector('.groups-container');
async function getAllGroups() {
  const token = localStorage.getItem('login_token');
  const resp = await fetch(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const jsData = await resp.json();
  console.log('jsData ===', jsData);
  if (jsData.success === false) {
    window.location.replace('login.html');
  }
  renderGroups(jsData.data, groupsContainerEl);
}

function renderGroups(groupsArr, dest) {
  dest.innerHTML = '';
  // console.log('groupsArr ===', groupsArr);
  groupsArr.forEach(({ group_id, name }) => {
    const singleGroupDiv = document.createElement('div');
    singleGroupDiv.className = 'single-group-container';
    const groupIdEl = document.createElement('h2');
    groupIdEl.textContent = `ID: ${group_id}`;
    const groupName = document.createElement('p');
    groupName.textContent = name;
    singleGroupDiv.append(groupIdEl, groupName);
    dest.append(singleGroupDiv);
    singleGroupDiv.setAttribute('data_id', group_id);
    console.log(singleGroupDiv);
    singleGroupDiv.addEventListener('click', () => {
      console.log(group_id);
      localStorage.setItem('group_id', group_id);
      window.location.replace('bills.html');
    });
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
    handleErrors();
  }
}

// const singleGroupEl = document.querySelector('.single-group');
// console.log(singleGroupEl);

// singleGroupEl.addEventListener('click', (e) => {
//   console.log(group_id);
// });
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
