async function saveUser(event){
    event.preventDefault()
    const name = event.target.name.value;
    const email =event.target.email.value;
    const phone =event.target.phone.value;
    const password =event.target.password.value;

    const userData = {
        name,email,phone,password
    }
     
    console.log(userData)
    try{
        let res = await axios.post('/user/signup',userData) 
        alert(res.data.message);
        window.location.href = "./login.html"
    } catch(err){
        console.log(err)
    }
    
   
    event.target.reset();

}


async function loginData(event){
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;

    const login = {
        email,password
    }

    try{
        const res = await axios.post('/user/login',login)
        alert(res.data.message);
        localStorage.setItem('token',res.data.token)
      localStorage.setItem('userId',res.data.userId)
         

          window.location.href = "/frontchat.html"
       
    } catch(err) {
        console.log(err)
    }
}
