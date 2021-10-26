setCookie = (name,value,days) => {
    let expires = ""
    if(days){
        let date = new Date()
        date.setTime(date.getTime() + (days*24*60*60*1000))
        expires = "; expires=" + date.toUTCString()
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/"
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
      
    let btnLogin = document.querySelector('#btnLogin')

    btnLogin.addEventListener('click', async () => {
        let username = document.querySelector('#username').value
        let password = document.querySelector('#password').value        
    
            const getUser = await fetch('/user-api-login', {
            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify({username: username, password: password})
            }).then(response => {return response.json()}).catch(err => {return err})
            console.log(getUser)
            if(getUser.auth !== false){
                let dataCook = getUser.result
                // console.log(getUser)
                setCookie('_SpaidRE', JSON.stringify(dataCook),7)
                window.location.href = '/product-home'
            }else{
                // location.reload()
                alertDanger = document.querySelector('.alert')
                alertDanger.setAttribute("class", "col-md-12 alert alert-danger show");            
            }
    })




