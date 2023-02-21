import { Component } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: []
})
export class BuscarComponent {

  termino:string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado!: Heroe | undefined;

  constructor(private heroesService: HeroesService){
    
  }
  
  buscando(){
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => this.heroes = heroes)
  }
  
  opcionSeleccionada(event:MatAutocompleteSelectedEvent){
    //Validar si es un string vacio
    if(!event.option.value){
      return;
    }
    
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero;
    this.heroesService.getHeroePorId(heroe.id!)
      .subscribe(heroe => this.heroeSeleccionado = heroe);
  }

}
