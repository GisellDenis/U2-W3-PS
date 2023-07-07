const URL = 'https://striveschool-api.herokuapp.com/api/product/'

const addressBarContent = new URLSearchParams(location.search)
const productId = addressBarContent.get('id')

const nameInput = document.getElementById('product-name')
const descriptionInput = document.getElementById('product-description')
const priceInput = document.getElementById('product-price')
const brandInput = document.getElementById('product-brand')
const imageInput = document.getElementById('product-image')

if (productId) {
  document.querySelector('h1').innerText = 'Attenzione ai dettagli'
  document.querySelector('.btn-primary').innerText = 'Modifica prodotto'
  fetch(URL + productId,{
    headers: {
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZDdlYTEyYjUwYzAwMTQ5ZTUwMTUiLCJpYXQiOjE2ODg3MjEzODYsImV4cCI6MTY4OTkzMDk4Nn0.wD9j_StmK9JGlyGIyg-wg66HxoWVG2T7YdslCrslB3o"
    }
    }
    )
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli del prodotto")
      }
    })
    .then((detail) => {
      console.log('DETAIL', detail)
      nameInput.value = detail.name
      descriptionInput.value = detail.description
      priceInput.value = detail.price
      brandInput.value = detail.brand
      imageInput.value = detail.imageUrl
    })
    .catch((err) => console.log(err))

    let deleteButton = document.querySelector('.btn-danger')
    deleteButton.classList.remove('d-none')
    let resetForm = document.querySelector('.btn-secondary')
    resetForm.classList.add('d-none')
    deleteButton.addEventListener('click', function () {
      let modalDel = document.querySelector('#exampleModal1 .btn-primary')
      modalDel.addEventListener('click',function(){
      fetch(URL + productId, {
        method: 'DELETE',
        headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZDdlYTEyYjUwYzAwMTQ5ZTUwMTUiLCJpYXQiOjE2ODg3MjEzODYsImV4cCI6MTY4OTkzMDk4Nn0.wD9j_StmK9JGlyGIyg-wg66HxoWVG2T7YdslCrslB3o"
        }
      })
        .then((res) => {
          if (res.ok) {
            alert('PRODOTTO ELIMINATO!')
            location.assign('home.html')
          } else {
            throw new Error("Problema nell'eliminazione del prodotto")
          }
        })
        .catch((err) => {
          console.log(err)
        })
      })
    })
}

const productForm = document.getElementById('product-form')
productForm.addEventListener('submit', function (e) {
  e.preventDefault()

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    price: priceInput.value,
    imageUrl: imageInput.value,
    brand: brandInput.value
  }

  console.log('ecco i valori recuperati dal form:', newProduct)

  const URL = 'https://striveschool-api.herokuapp.com/api/product/'

  let urlToUse
  if (productId) {
    urlToUse = URL +  productId
  } else {
    urlToUse = URL
  }

  let methodToUse
  if (productId) {
    methodToUse = 'PUT'
  } else {
    methodToUse = 'POST'
  }

  fetch(urlToUse, {
    method: methodToUse, 
    body: JSON.stringify(newProduct),
    headers: {
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ZDdlYTEyYjUwYzAwMTQ5ZTUwMTUiLCJpYXQiOjE2ODg3MjEzODYsImV4cCI6MTY4OTkzMDk4Nn0.wD9j_StmK9JGlyGIyg-wg66HxoWVG2T7YdslCrslB3o", 

      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (res.ok) {
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        imageInput.value = ''
        brandInput.value = ''
        location.assign('home.html')
      } else {
        throw new Error("Errore nel salvataggio del prodotto")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

const resetForm = document.querySelector('#exampleModal2 .btn-primary')
resetForm.addEventListener('click', function(){
        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
        imageInput.value = ''
        brandInput.value = ''
})