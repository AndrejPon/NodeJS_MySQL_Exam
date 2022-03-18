const URL = 'http://localhost:3000/bills/:id';
const errorsContainerEl = document.querySelector('.errors');
const billsContainerEl = document.querySelector('.bills-container');

async function getAllBills(id) {
  const token = localStorage.getItem('login_token');
  const resp = await fetch(URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const jsData = await resp.json();

  console.log('jsData ===', jsData);
  if (jsData.success === false) {
    window.location.replace('login.html');
  }
  renderBills(jsData.data, billsContainerEl);
}

function renderBills(billsArr, dest) {
  dest.innerHTML = '';
  const id = localStorage.getItem('group_id');
  console.log('group_id ===', id);
  console.log('billsArr ===', billsArr);
  billsArr.forEach(({ amount, description }) => {
    dest.innerHTML += `
    <article class="single-bill">
        <h2 class="group-id">ID: ${id}</h2>
        <p>${description}</p>
        <p>$${amount}</p>
        </article>
    `;
  });
}

const formEl = document.forms.addbill;

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const groupId = localStorage.getItem('group_id');
  console.log('groupId ===', groupId);
  const newBillObj = {
    groupId,
    amount: formEl.elements.amount.value,
    description: formEl.elements.description.value,
  };
  console.log('newBillObj ===', newBillObj);
  createNewBill(newBillObj);
});

async function createNewBill(newBillObj) {
  const token = localStorage.getItem('login_token');
  if (token === null) throw new Error('token not found');
  const resp = await fetch(`${URL}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newBillObj),
  });
  const dataInJs = await resp.json();
  console.log('dataInJs ===', dataInJs);
  if (dataInJs.success === true) {
    getAllBills();
  } else {
    handleErrors();
  }
}

function handleErrors(errorArray) {
  errorsContainerEl.innerHTML = '';
  console.log('errorArray ===', errorArray);
  errorArray.details.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}

getAllBills();
