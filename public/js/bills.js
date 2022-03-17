const URL = 'http://localhost:3000/bills/:id';
const errorsContainerEl = document.querySelector('.errors');

const billsContainerEl = document.querySelector('.bills-container');
async function getAllBills() {
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
  // console.log('renderBills ===', renderBills);
  console.log('billsArr ===', billsArr);
  billsArr.forEach(({ group_id, amount, description }) => {
    dest.innerHTML += `
    <article class="single-bill">
        <h2 class="group-id">ID: ${group_id}</h2>
        <p>$${amount}</p>
        <p>${description}</p>
    </article>
    `;
  });
}

const formEl = document.forms.addbill;

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const newBillObj = {
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

function handleSuccess() {
  const alertEl = document.createElement('h4');
  alertEl.className = 'alert';
  alertEl.textContent = 'New bill added';
  document.body.prepend(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 3000);

  formEl.reset();
}

function handleErrors(errorArray) {
  errorsContainerEl.innerHTML = '';
  console.log('errorArray ===', errorArray);
  errorArray.details.forEach((err) => {
    errorsContainerEl.innerHTML += `<p>${err.message}</p>`;
  });
}
getAllBills();
