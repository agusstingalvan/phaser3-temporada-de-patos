import Phaser from "phaser";
import { config } from "./config";

export default new Phaser.Game(config);
const div = document.createElement("div");
div.classList.add("container");
const html = `
<div class="row" >
  <h2 class="text-center text-white fw-bold mt-4">Equipo</h2>
  <div class="col-12 col-sm-4 d-flex justify-content-center my-4">
  <div class="card" style="width: 18rem;" >
    <img src="public/assets/patos/spritesheets/pato-verde.png" class="card-img-top" alt="Imagen Agustin galvan">
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
    <h5 class="card-title fs-4">Agustin Galvan</h5>
    <p class="card-text fs-5">Programador</p>
    <a href="https://agustingalvan.netlify.app/" target="_blank" class="btn btn-primary">Ver portafolio</a>
    </div>
  </div>
  </div>      
  <div class="col-12 col-sm-4 d-flex justify-content-center my-4">
  <div class="card" style="width: 18rem;">
    <img src="public/assets/patos/spritesheets/pato-galera.png" class="card-img-top" alt="Imagen Joaquin Fratini">
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
    <h5 class="card-title fs-4 mb-0">Joaquin Fratini</h5>
    <p class="card-text fs-5">Artista</p>
    <a href="public/assets/patos/spritesheets/pato-verde.png" target="_blank" class="btn btn-primary">Ver portafolio</a>
    </div>
  </div>
  </div>      
  <div class="col-12 col-sm-4 d-flex justify-content-center my-4">
  <div class="card" style="width: 18rem;">
    <img src="public/assets/patos/spritesheets/pato-recibido.png" class="card-img-top" alt="Imagen Gonzalo Belen">
    <div class="card-body d-flex flex-column justify-content-center align-items-center">
    <h5 class="card-title fs-4">Gonzalo Belen</h5>
    <p class="card-text fs-5 ">Game Design</p>
    <a href="#" target="_blank" class="btn btn-primary">Ver portafolio</a>
    </div>
  </div>
  </div>
</div>`;
div.innerHTML = html;
setTimeout(() => document.body.appendChild(div), 50);
