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
                                        <div class="col-md-4"><img class="img-style" src="/uploads/${item.img}"></div>
                                        <div class="col-md-3">${item.nameprod}</div>
                                        <div class="col-md-1">${item.stock}</div>
                                        <div class="col-md-1">${item.price}</div>
                                        <div class="col-md-2"><button id="ubah${index}" class="btn btn-success">Update</button> | <button id="hapus${index}" class="btn btn-danger">Delete</button></div>
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

                btnUpdate = document.querySelector(`#ubah${index}`)
                function klikUpd(params){
                    btnUpdate.addEventListener("click", async () => {
                        valID = document.querySelector(`#iduser${params}`).value
                        console.log(valID)
                        // document.querySelector('.wrapper-contain').classList.add('hide')
                        // document.querySelector('.wrapper-contain2').classList.remove('hide')
                        // document.querySelector('.wrapper-contain2').classList.add('show')
                        const getRes = await fetch('/product-api-getid2',
                        {
                            method: 'GET',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${dataCookie}`
                            },
                            body: JSON.stringify({id: valID})
                        }).then(response => {return response.json()}).catch(err => {return err})
                        // console.log(getRes)
                        window.location.href = '/user-upd/'+ valID
                        // document.querySelector('#img-upd').innerHTML = `<img class="img-upd" src="/uploads/${item.img}"></img>`
                        // document.querySelector('#inputName').value = `${getRes.result.nameprod}`
                        // document.querySelector('#inputStock').value = `${getRes.result.stock}`
                        // document.querySelector('#inputPrice').value = `${getRes.result.price}`
                        // document.querySelector('#id').value = `${getRes.result._id}`
                    })
                }
                klikUpd(index)                
            })
            btnSub = document.querySelector('#btn-submit')
                btnSub.addEventListener('click', async() => { 
                    let dataCookie = JSON.parse(getCookie('_SpaidRE'))  
                    valName = document.querySelector('#inputName').value
                    valStock = document.querySelector('#inputStock').value
                    valPrice = document.querySelector('#inputPrice').value
                    valID = document.querySelector('#id').value
                    let btnImg = document.querySelector('#formFile')

                    let formData = new FormData()
                    let photo = btnImg.files[0];                    
                    // console.log(photo)
                    if(photo == null || photo == undefined) {
                        formData.append("id", valID)
                        formData.append("nameprod", valName)
                        formData.append("price", valPrice) 
                        formData.append("stock", valStock)
                    }else {
                        let photo2 = btnImg.files[0].name;
                        formData.append("image", photo)
                        formData.append("id", valID)
                        formData.append("nameprod", valName)
                        formData.append("price", valPrice) 
                        formData.append("stock", valStock) 
                        formData.append("img", photo2) 
                    }
                    

                    const ctrl = new AbortController()    // timeout
                    setTimeout(() => ctrl.abort(), 5000);

                    const rawResponse = await fetch('/product-api-update', {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${dataCookie}`},
                    body: formData,
                    signal: ctrl.signal
                    }).then(response => {return response.json()}).catch(err => {return "error"})
                    console.log(rawResponse)
                    if(rawResponse.status == 200){ 
                        location.reload()
                    }
                 })            
        }else{
            hideColAksi = document.querySelector('.col-aksi')
            hideColAksi.classList.add("hide");
            hideAdd = document.querySelector('#add-prod')
            hideAdd.classList.add("hide");
            await lisData.forEach((item,index) => {
                getLis.innerHTML += `
                                    <div class="row wrapper-list">
                                        <input type="hidden" id="iduser${index}" value="`+ item._id + `">
                                        <div class="col-md-1">${index+1}</div>
                                        <div class="col-md-4"><img class="img-style" src="/uploads/${item.img}"></div>
                                        <div class="col-md-3">${item.nameprod}</div>
                                        <div class="col-md-1">${item.stock}</div>
                                        <div class="col-md-1">${item.price}</div>
                                    </div>            
                                     `
            }); 
        }            
        

        // btn logout act
        btnLogout = document.querySelector('#btn-signout')
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