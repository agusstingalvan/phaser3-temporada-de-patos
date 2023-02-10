import Phaser from 'phaser'
import { config } from './config';
import { getTop } from './services/getTop';


export default new Phaser.Game(config);
const div = document.createElement('div');
div.classList.add('container')
const html = `
<div class="row">
    <h2 class="text-center text-white fw-bold mt-4">Equipo</h2>
  <div class="col-12 col-sm-4 d-flex justify-content-center my-4">
    <div class="card" style="width: 18rem;">
      <img src="https://avatars.githubusercontent.com/u/50257259?s=400&u=7276b1a8c1eb34e4773215efea1522aa0af29af8&v=4" class="card-img-top" alt="Imagen Agustin galvan">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 class="card-title fs-4">Agustin Galvan</h5>
        <p class="card-text fs-5">Programador</p>
        <a href="https://agustingalvan.com.ar/" target="_blank" class="btn btn-primary">Ver portafolio</a>
      </div>
    </div>
  </div>      <div class="col-12 col-sm-4 d-flex justify-content-center my-4">
    <div class="card" style="width: 18rem;">
      <img src="https://cdn.discordapp.com/attachments/963276378927677520/1039942391899111515/joa.jpeg" class="card-img-top" alt="Imagen Joaquin Fratini">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 class="card-title fs-4 mb-0">Joaquin Fratini</h5>
        <p class="card-text fs-5">Artista</p>
        <a href="https://joaquinfratini.github.io/Programacion-1-tp1/portafolio/index.html" target="_blank" class="btn btn-primary">Ver portafolio</a>
      </div>
    </div>
  </div>      <div class="col-12 col-sm-4 d-flex justify-content-center my-4">
    <div class="card" style="width: 18rem;">
      <img src="https://cdn.discordapp.com/attachments/968592996423593995/1039979360431644772/WhatsApp_Image_2022-11-09_at_14.41.18.jpeg" class="card-img-top" alt="Imagen Gonzalo Belen">
      <div class="card-body d-flex flex-column justify-content-center align-items-center">
        <h5 class="card-title fs-4">Gonzalo Belen</h5>
        <p class="card-text fs-5 ">Game Design</p>
        <a href="#" target="_blank" class="btn btn-primary">Ver portafolio</a>
      </div>
    </div>
  </div>
</div>`
div.innerHTML = html;
setTimeout(()=>document.body.appendChild(div), 50)