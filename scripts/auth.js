
const makeAdminForm = document.querySelector('.admin-actions');
makeAdminForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    const AdminEmail = document.querySelector('#admin-email').value;
    const addAdmin = functions.httpsCallable('addAdminRole');
    addAdmin({
        email: AdminEmail
    }).then( result=>{
        console.log(result);
    })
    makeAdminForm.reset();
})

auth.onAuthStateChanged(user =>{
    if(user){
        user.getIdTokenResult().then(tokenResult =>{
            user.admin = tokenResult.claims.admin
        })
        db.collection('guides').onSnapshot(snapshot =>{
            setupUi(user);
            setupGuides(snapshot.docs);
        },err =>{
            console.log(err.message)
        });
    }else{
        setupUi(user);
        setupGuides([]);
    }

})

const signUpForm = document.getElementById('signup-form');
signUpForm.addEventListener('submit',((e)=>{
    e.preventDefault();

    let email = signUpForm['signup-email'].value;
    let password = signUpForm['signup-password'].value;

    auth.createUserWithEmailAndPassword(email,password).then((cred) =>{
        return db.collection('users').doc(cred.user.uid).set({
            bio : signUpForm['signup-bio'].value
        }).then( () =>{
            const modal = document.querySelector('#modal-signup');
            M.Modal.getInstance(modal).close();
            signUpForm.reset();
        })
    })
}))

//logout
const logout = document.getElementById('logout');
logout.addEventListener('click',(e) =>{
    e.preventDefault();
    auth.signOut().then(() =>{
        
    })
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e =>{
    e.preventDefault();

    let email = loginForm['login-email'].value;
    let password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email,password).then((cred) =>{
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
}))

const createGuideForm = document.getElementById('create-form');
createGuideForm.addEventListener('submit',(e =>{
    e.preventDefault();
    db.collection('guides').add({
        title : createGuideForm['title'].value,
        content : createGuideForm['content'].value
    }).then(() =>{
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createGuideForm.reset();
    })
}))