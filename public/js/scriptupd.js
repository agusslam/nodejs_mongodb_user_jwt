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

    //get username
    getInfo = async() => {
        let dataCookie = JSON.parse(getCookie('_SpaidRE'))
        const getIn = await fetch('/user-api-cek', {
            method: 'GET',
            headers: {
                    'Authorization': `Bearer ${dataCookie}`
                    },
            }).then(response => {return response.json()}).catch(err => {return err})
        document.querySelector('#navbarDropdown').innerHTML = getIn.name
    }
    getInfo()

  //button img diambil
  btnImg = document.querySelector('#formFile')
  btnImg.addEventListener('change', async() => {
      let dataCookie = JSON.parse(getCookie('_SpaidRE'))
      photo = btnImg.files[0]
      const formData = new FormData()
      formData.append('image', photo);
      const addNew = await fetch('/product-api-upload', {
          method: 'POST',
          headers: {
                  'Authorization': `Bearer ${dataCookie}`
                  },
          body: formData
          }).then(response => {return response.json()}).catch(err => {return err})
    //   console.log(addNew)
      if(addNew.status == 200) {
          document.querySelector('#alert-upload-success').classList.remove('hide')
          document.querySelector('#alert-upload-success').classList.add('show')
      }else {
          document.querySelector('#alert-upload-danger').classList.remove('hide')
          document.querySelector('#alert-upload-danger').classList.add('show')
      }
  })

  btnSub = document.querySelector('#btn-submit')
  btnSub.addEventListener('click', async() => { 
      let dataCookie = JSON.parse(getCookie('_SpaidRE'))  
      valName = document.querySelector('#inputName').value
      valStock = document.querySelector('#inputStock').value
      valPrice = document.querySelector('#inputPrice').value
      valID = document.querySelector('#id').value
      let btnImg = document.querySelector('#formFile')

      if(btnImg.files[0] == null || btnImg.files[0] == undefined){ valImg = null }
      else { valImg = btnImg.files[0].name }      

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
              img: valImg
          })
          }).then(response => {return response.json()}).catch(err => {return err})
        //   console.log(updId)
          if(updId.status == 200) {
              document.querySelector('#alert-add-success').classList.remove('hide')
              document.querySelector('#alert-add-success').classList.add('show')
              setTimeout(function(){ location.reload() }, 1500);
          }else {
              location.reload()
              document.querySelector('#alert-add-danger').classList.remove('hide')
              document.querySelector('#alert-add-danger').classList.add('show')
          }
      })
      

  btnBac = document.querySelector('#btn-back')
  btnBac.addEventListener('click', () => { window.location.href = '/product-home' })