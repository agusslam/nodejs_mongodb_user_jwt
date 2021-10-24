//get cookie
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

function delete_cookie( name, path, domain ) {
    if( getCookie( name ) ) {
      document.cookie = name + "=" +
        ((path) ? ";path="+path:"")+
        ((domain)?";domain="+domain:"") +
        ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
  }

// script for fetching data all
const getData = async () => {
    try {
        let dataCookie = JSON.parse(getCookie('_SpaidRE'))
        // console.log(dataCookie)
        const getRes = await fetch('/product-api-get',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dataCookie}`
                }
            }).then(response => {return response.json()}).catch(err => {return false})
        if(getRes.auth !== false) {
            return getRes
        }else { 
            window.location.href = '/user-login' 
        }
        
    } catch (err) {
        console.error(err.message)
    }
}

getData()
    .then(async allData => {
        const getLis = document.querySelector('.content-list')        
        let lisData = allData.result
        // console.log(allData.auth)
        //show List Data
        if(allData.auth == 'member'){
            await lisData.forEach((item,index) => {
                getLis.innerHTML += `
                                    <div class="row wrapper-list">
                                        <input type="hidden" id="iduser${index}" value="`+ item._id + `">
                                        <div class="col-md-1">${index+1}</div>
                                        <div class="col-md-4">${item.img}</div>
                                        <div class="col-md-3">${item.nameprod}</div>
                                        <div class="col-md-1">${item.stock}</div>
                                        <div class="col-md-1">${item.price}</div>
                                        <div class="col-md-2"><button id="ubah${index}" class="btn-aksi">Update</button> | <button id="hapus${index}" class="btn-aksi2">Delete</button></div>
                                    </div>                                            
                                     `
            }); 
            // btn del and ubah act
            await lisData.forEach((item,index) => { 
                let dataCookie = JSON.parse(getCookie('_SpaidRE'))         
                btnDel = document.querySelector(`#hapus${index}`)
                function klikDel(params){
                    btnDel.addEventListener("click", async () => {
                        let konfirm = confirm("Kamu yakin menghapus data ? ") 
                        if(konfirm == true) {
                            valID = document.querySelector(`#iduser${params}`).value 
                            const rawResponse = await fetch('/product-api-delete', {
                            method: 'POST',
                            headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${dataCookie}`
                                    },
                            body: JSON.stringify({id: valID})
                            });
                            const content = await rawResponse.json();
                            console.log(content)
                            if(content.type == 200){location.reload()}
                        }
                    })
                }
                klikDel(index)

                btnUpdate = document.querySelector(`#update${index}`)
                function klikUpd(params){
                    btnDel.addEventListener("click", async () => {
                        valID = document.querySelector(`#iduser${params}`).value 
                        const rawResponse = await fetch('/product-api-update', {
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${dataCookie}`
                                },
                        body: JSON.stringify({id: valID})
                        });
                        const content = await rawResponse.json();
                        console.log(content)
                        if(content.type == 200){location.reload()}
                    })
                }
                klikUpd(index)
            })
            
        }else{
            hideColAksi = document.querySelector('.col-aksi')
            hideColAksi.classList.add("hide");
            await lisData.forEach((item,index) => {
                getLis.innerHTML += `
                                    <tr>
                                        <input type="hidden" id="iduser${index}" value="`+ item._id + `">
                                        <th scope="row">${index+1}</th>                                
                                        <td>${item.username}</td>
                                        <td>${item.email}</td>
                                        <td>${item.age}</td>
                                        <td>${item.address}</td>
                                    </tr>           
                                     `
            }); 
        }            
        

        //btn logout act
        btnLogout = document.querySelector('#logout')
        btnLogout.addEventListener('click', async () => {
            try {
                let dataCookie = JSON.parse(getCookie('_SpaidRE'))
                const logOut = await fetch('/user-api-logout', {
                    method: 'POST',
                    headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${dataCookie}`
                            }
                    }).then(response => {return response.json()}).catch(err => {return "error"})
                if(logOut.auth == false) {
                    delete_cookie('_SpaidRE')
                    location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        })
        
        
    }).catch(err => {console.error(err)})