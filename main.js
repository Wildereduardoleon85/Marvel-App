$(document).ready(()=>{

    $('#formulario').on('submit', (e)=>{
        e.preventDefault();
        const resultados = $('#busqueda').val();
        cargar_resultados(resultados);
        cargar_comics(resultados);
    })

    function cargar_resultados(resultados){
        axios.get(`https://gateway.marvel.com:443/v1/public/characters?name=${resultados}&ts=1&apikey=ab46b6b8e5ea4d6aa777bbf67d0f52fd&hash=c0661e015862e51f35dbfda4fbbcef63`)
          .then((response) => {
  
            let heroes = response.data.data.results;
            let salida = '';

            if(Object.keys(heroes).length>=1){

              $('#titulo-heroe').text("Search For Your Hero!!");
              

              $.each(heroes, (index, heroe) => {

                salida += `
  
                  <div id="creado" class="thumbnail col-xs-6 w-sx-75 col-sm-8 col-md-3 p-0">
                      <img src="${heroe.thumbnail.path}${'.'}${heroe.thumbnail.extension}" class="img-fluid" alt="${heroe.name}">
                  </div>
  
                  <div id="creado" class="col-9 m-4">
                      <h1 class="mb-4">${heroe.name}</h1>
                      <h3>Description:</h3>
                      <p class="mr-4">${heroe.description}</p>
                  </div>
                  
                  `;
              });
        
              $('#char-desc').html(salida);
            }else{

              $('#titulo-comic').text('');
              $('div#creado').remove();
            }

           
          })

          .catch((err) => {
            console.log(err);
          });
      }

      function cargar_comics(resultados){
        axios.get(`https://gateway.marvel.com:443/v1/public/comics?titleStartsWith=${resultados}&ts=1&apikey=ab46b6b8e5ea4d6aa777bbf67d0f52fd&hash=c0661e015862e51f35dbfda4fbbcef63`)
          .then((response) => {
            
            let comics = response.data.data.results;
            let salida = '';

            console.log(comics)

            if(Object.keys(comics).length>=1){
              $.each(comics, (index, comic) => {

                $('#titulo-comic').text('Comics: ');
                salida += `
               
                    <div id="creado2" class="card col-9 col-sm-4 col-md-3 p-0 bg-dark mx-3 mt-4">
                        <img class="card-img-top" src="${comic.thumbnail.path}${'.'}${comic.thumbnail.extension}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${comic.title}</h5>
                            <p class="card-text">Print Price: ${comic.prices[0].price}</p>
                            <a href="${comic.urls[0].url}" target="_blank" class="card-link" style="color: #FCB101;">Comic Details</a>
                        </div>
                    </div>
                  `;
              });
        
              $('#comic-content').html(salida);
            }else{

              $('div#creado2').remove();
              $('#titulo-heroe').text("Oops!! it seems we couldn't find your hero");
            }
          
          })

          .catch((err) => {
            console.log(err);
          });
      }
    
})