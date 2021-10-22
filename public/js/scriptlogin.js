let btnLogin = document.querySelector('#btnLogin')

btnLogin.addEventListener('click', async () => {
    let username = document.querySelector('#username').value
    let password = document.querySelector('#password').value
    setCookie = (name,value,days) => {
        let expires = ""
        if(days){
            let date = new Date()
            date.setTime(date.getTime() + (days*24*60*60*1000))
            expires = "; expires=" + date.toUTCString()
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/"
    }

    const getUser = await fetch('/user-api-login', {
        method: 'POST',
        headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
        body: JSON.stringify({username: username, password: password})
        });
    const userNow = await getUser.json();
    // console.log(userNow.status)
    if(userNow.status === 200){
        alert("Great!!! You're success login")
        setCookie('_secure', JSON.stringify(userNow),7)
        window.location.href = '/user-view'
    }else { 
        alert("Wrong Username / Password")
        location.reload()
     }
})

