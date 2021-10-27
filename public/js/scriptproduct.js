let fulldate = new String();
let dayname = ("Sunday Monday Tuesday Wednesday Thursday Friday Saturday");
daynames = dayname.split(" ");
let months = ("Jan Februari Mar April May Jun Jul Aug Sept Oct Nov Dec");
months = months.split(" ");
let datenow = new Date();
let day = datenow.getDay();
let date = datenow.getDate();
let month = datenow.getMonth();
let year = datenow.getFullYear();
// console.log(day)
fulldate = daynames[day] + ", " +date + " " + months[month] + " " + year;

document.querySelector('.dateP').innerHTML = fulldate

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

//
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
            window.location.href = '/product-login' 
        }
        
    } catch (err) {
        console.error(err.message)
    }
}

getData()
    .then(async allData => {
        const getLis = document.querySelector('.content-list')        
        let lisData = allData.result.data
        console.log(allData)
        //show List Data
        document.querySelector('#navbarDropdown').innerHTML = allData.result.name
        if(allData.auth == 'member'){
            await lisData.forEach((item,index) => {
                getLis.innerHTML += `
                                    <div class="row wrapper-content-list">
                                        <input type="hidden" id="iduser${index}" value="`+ item._id + `">
                                        <div class="col-md-6 items">
                                            <div class="row">
                                                <div class="col-md-4 img-items" style="background-image: url(/uploads/${item.img});"></div>
                                                <div class="col-md-8 text-items"><h6>${item.nameprod}</h6></div>
                                            </div>                        
                                        </div>
                                        <div class="col-md-2 text-items">
                                            <h6>${item.stock}</h6>
                                        </div>
                                        <div class="col-md-2 text-items">
                                            <h6>${item.price}</h6>
                                        </div>
                                        <div class="col-md-2 text-items">
                                            <button type="submit" id="ubah${index}" class="btn-edit">Update</button><button type="submit" id="hapus${index}" class="btn-del">Delete</button>
                                        </div>
                                    </div>                                            
                                     `
            }); 
            // btn del, add, ubah act
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
                        window.location.href = '/product-upd/'+ valID
                    })
                }
                klikUpd(index)                
            })

                btnAdd = document.querySelector(`#tambah`)
                let dataCookie = JSON.parse(getCookie('_SpaidRE'))
                btnAdd.addEventListener("click", async() => {
                    const getRes = await fetch('/product-api-new',
                    {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${dataCookie}`
                        },
                    }).then(response => {return response.json()}).catch(err => {return err})
                    if(getRes.status == 200) {
                        window.location.href = '/product-add'
                    }else {
                        window.location.href = '/product-home'
                    }
                })       
        }else{
            document.querySelector('#tambah').classList.add('hide')
            await lisData.forEach((item,index) => {
                getLis.innerHTML += `
                                    <div class="row wrapper-content-list">
                                        <input type="hidden" id="iduser${index}" value="`+ item._id + `">
                                        <div class="col-md-6 items">
                                            <div class="row">
                                                <div class="col-md-4 img-items" style="background-image: url(/uploads/${item.img});"></div>
                                                <div class="col-md-8 text-items"><h6>${item.nameprod}</h6></div>
                                            </div>                        
                                        </div>
                                        <div class="col-md-2 text-items">
                                            <h6>${item.stock}</h6>
                                        </div>
                                        <div class="col-md-2 text-items">
                                            <h6>${item.price}</h6>
                                        </div>
                                        <div class="col-md-2 text-items">
                                            <button type="submit" id="detail${index}" class="btn-edit">Detail</button>
                                        </div>
                                    </div>              
                                     `
            })
            
            await lisData.forEach((item,index) => { 
                btnDet = document.querySelector(`#detail${index}`)
                console.log(index)
                function klikDet(params){
                    btnDet.addEventListener("click", async () => {
                        valID = document.querySelector(`#iduser${params}`).value
                        window.location.href = '/product-detail/'+ valID
                    })                    
                }
                klikDet(index)
            })
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