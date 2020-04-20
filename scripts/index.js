const guideList = document.querySelector('.guides');
const setupGuides = (data) =>{

  if(data.length){
  html = '';
  data.forEach(docs =>{
    const guide = docs.data();
    const li = `
          <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
          </li>
    `
    html += li;
  })
  guideList.innerHTML = html;
}else{
  guideList.innerHTML = '<h5 class="align-center">YOU HAVE NO GUIDES</h5>';
}

}

const loggedInLinks = document.querySelectorAll('.logged-in');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const accountDetails = document.querySelector('.account-details');
const adminList = document.querySelectorAll('.admin');

const setupUi = (user) =>{
    if(user){
      if(user.admin){
        adminList.forEach(items => items.style.display='block');
      }
      db.collection('users').doc(user.uid).get().then((doc) =>{
        const html = `
        <div>logged in as ${user.email}</div>
        <div>${doc.data().bio} </div>
        <div class="pink-text"> ${user.admin ? 'Admin' : ''} </div>`
        accountDetails.innerHTML = html;
      })
    
      
      loggedInLinks.forEach(items => items.style.display = 'block');
      loggedOutLinks.forEach(items => items.style.display = 'none');
    }else{
      loggedInLinks.forEach(items => items.style.display = 'none');
      loggedOutLinks.forEach(items => items.style.display = 'block');
      accountDetails.innerHTML = '';
    }
}

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});