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

  btnSub = document.querySelector('#btn-submit')
  btnSub.addEventListener('click', async() => { 
      let dataCookie = JSON.parse(getCookie('_SpaidRE'))  
      valName = document.querySelector('#inputName').value
      valStock = document.querySelector('#inputStock').value
      valPrice = document.querySelector('#inputPrice').value
      valID = document.querySelector('#id').value
      // let btnImg = document.querySelector('#formFile')

      // let photo = btnImg.files[0].name;

      const updId = await fetch('/product-api-update/' + valID, {
          method: 'POST',
          headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${dataCookie}`
                  },
          body: JSON.stringify({
              nameprod: valName, 
              stock: valStock,
              price: valPrice,
              // img: photo
          })
          }).then(response => {return response.json()}).catch(err => {return err})
          console.log(updId)
          if(updId.status == 200) {
              document.querySelector('#alert-add-success').classList.remove('hide')
              document.querySelector('#alert-add-success').classList.add('show')
          }else {
              location.reload()
              document.querySelector('#alert-add-danger').classList.remove('hide')
              document.querySelector('#alert-add-danger').classList.add('show')
          }
      })
      

  btnBac = document.querySelector('#btn-back')
  btnBac.addEventListener('click', () => { window.location.href = '/product-home' })