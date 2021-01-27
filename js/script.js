// Declaracion de variables globales
let contenido = document.querySelector('#contenido');
let contenido2 = document.querySelector('#list');
let btnSearch = document.getElementById('btnSearch');
let api = 'https://api.mercadolibre.com/sites/MLA/search?q=';

// Funciones
// Funcion buscar producto
searchProduct = function () {
  let search = document.getElementById('inputSearch').value;
  if (search === '') {
    alert(
      'Error! Es necesario  que ingrese un caracter en el campo de busqueda.'
    );
  } else {
    let url = api + search;
    contenido2.innerHTML = ``;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        for (let i = 0; i < 12; i++) {
          let id ='https://api.mercadolibre.com/items?ids=' + data.results[i].id;
          const li = document.createElement('li');
          li.appendChild(document.createTextNode(i));
          //condicional envio gratis
          if (data.results[i].shipping.free_shipping) {
            let shipping = 'Envio gratis';
          } else {
            let shipping = '';
          };
          // Condicional para el descuento en el precio
          if (data.results[i].original_price) {
            let discount = data.results[i].currency_id + ' ' + data.results[i].original_price;
            
          } else {
            let discount = '';
          };
          li.innerHTML = `
        <div class="W5-p7" data-wt="W5"">
          <li>
        <div class="W5-product-b">   
        <div class="W5-product">
              <a class="W5-product-item" ">
              <span class="item_pid hidden"></span>
              <div class="W5-thumbnail d-block w-300"><img src="${data.results[i].thumbnail}" /></div>
              <div class="W5-title">${data.results[i].title}</div>
                <div class="price"><span class="W5-price-new item_price">${data.results[i].currency_id} ${data.results[i].price}<span><span class="W5-price-old item_price"> ${ discount }</span></div>
                <div class="W5-description">Ubicacion: ${data.results[i].address.state_name} </br>
                ${data.results[i].attributes[0].name} : ${data.results[i].attributes[0].value_name} </br>
                ${data.results[i].attributes[1].name} : ${data.results[i].attributes[1].value_name} </br>
                <p class="text-success h6">${shipping}</p> 
                <p id="id_art" hidden>${id}</p>                    
                </div>
         <div class="W5-cart "><button class="add-cart" id="btnDetails" onclick="getDetails('${id}')">Detalles</button><button class="fa fa-shopping-cart fa-2x"></button></div>
              </a>
            </div>
        </div>
        </li>
        </div>`
          contenido2.appendChild(li)
          const btnDetails = document.getElementById('btnDetails');
          //btnDetails.addEventListener('click', getDetails);
        }
      });
  }
};

// Funcion ver detalles
getDetails = function (id) {
  fetch(id)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      console.log(data['0'].body.pictures.length);
      contenido2.innerHTML = '';
      contenido2.innerHTML = `
      <div class="container2">
      <div class="row">
        <div class="left col-md-6">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="${data['0'].body.pictures[0].url}" class="d-block w-100" alt="Imagen no disponible">
            </div>
            <div class="carousel-item">
              <img src="${data['0'].body.pictures[1].url}" class="d-block w-100" alt="Imagen no disponible">
            </div>
            <div class="carousel-item">
              <img src="${data['0'].body.pictures[2].url}" class="d-block w-100" alt="Imagen no disponible">
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        </div>
        <div class="right col-md-6">
          <h3 class="product">${data['0'].body.title}</h3>
          <ul class="desc">
            <li>${data['0'].body.attributes[1].name}: ${data['0'].body.attributes[1].value_name}</li>
            <li>${data['0'].body.attributes[0].name}: ${data['0'].body.attributes[0].value_name}</li>
            <li>${data['0'].body.attributes[2].name}: ${data['0'].body.attributes[2].value_name}</li>
            <li>${data['0'].body.attributes[4].name}: ${data['0'].body.attributes[4].value_name}</li>
          </ul>
        <p class="price">${data['0'].body.currency_id} ${data['0'].body.base_price}</p>
          <p class="buy">Comprar</p>
       </div>
     </div>`
    });
};

clearInput = function () {
  document.getElementById('inputSearch').value = '';
};

// Eventos
btnSearch.addEventListener('click', searchProduct);

