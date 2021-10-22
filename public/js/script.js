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

// script for fetching data all
const getData = async () => {
    try {
        let dataCookie = JSON.parse(getCookie('_secure'))
        // console.log(dataCookie.result.token)
        const response = await fetch('/user-api-get',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${dataCookie.result.token}`
                }
            })
        if(response !== false) {
            const allData = await response.json()
            return allData
        }else { console.log("error")}
        
    } catch (err) {
        console.error(err.message)
    }
}

getData()
    .then(async allData => {
        const getLis = document.querySelector('#list-data')        
        let lisData = allData.result
        //show List Data
        await lisData.forEach((item,index) => {
            getLis.innerHTML += `
                                <tr>
                                    <input type="hidden" id="iduser${index}" value="`+ item._id + `">
                                    <th scope="row">${index+1}</th>                                
                                    <td>${item.username}</td>
                                    <td>${item.email}</td>
                                    <td>${item.age}</td>
                                    <td>${item.address}</td>
                                    <td><button id="ubah${index}" class="btn-aksi">Ubah</button> | <button id="hapus${index}" class="btn-aksi2">Hapus</button></td>
                                </tr>           
                                 `
        });       
        // btn del act
        await lisData.forEach((item,index) => {          
            btnDel = document.querySelector(`#hapus${index}`)
            function klikDel(params){
                btnDel.addEventListener("click", async () => {
                    let konfirm = confirm("Kamu yakin menghapus data ? ") 
                    if(konfirm == true) {
                        valID = document.querySelector(`#iduser${params}`).value 
                        const rawResponse = await fetch('/user-api-delete', {
                        method: 'POST',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
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
        })

        //btn tambah act
        
        
    }).catch(err => {console.error(err)})


let dataCookie = JSON.parse(getCookie('_secure'))
let loginData = document.querySelector('.userNow')
loginData.innerHTML = dataCookie.result.username

