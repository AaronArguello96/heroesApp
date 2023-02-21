import { Component } from '@angular/core';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class AgregarComponent {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  }

  constructor(private heroesService: HeroesService, private activatedRoute: ActivatedRoute, private router: Router, private snackBar: MatSnackBar, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }
    this.activatedRoute.params //De esta forma obtenemos el id de la URL 
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id)))  //De esta forma, con el pipe y el switchMap recuperamos el ID de la URL y hacemos una llamada al servicio para que nos devuelva toda la info de ese id
      //.subscribe(({id})=> console.log(id))
      .subscribe(heroe => this.heroe = heroe);
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    //Como estamos utilizando la misma url para crear y editar los heroes podemos utilizar la condición del id. Si tiene es porque ya está en BBDD, sino no
    if (this.heroe.id) {
      //Editar
      this.heroesService.editarHeroe(this.heroe)
        .subscribe(resp => {
          //console.log('Actualizando: ', resp);
          this.mostrarSnackBar('Registro actualizado');
        })
    } else {
      //Crear
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe(resp => {
          this.router.navigate(['/heroes/editar', resp.id]);
          this.mostrarSnackBar('Registro creado correctamente');
        })
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(
      (result) => {
        if (result) { //De esta forma comprobamos que cuando se cierra el cuadro de dialogo está devolviendo algo. Si devuelve undefines es porque se ha pinchado fuera y no hace nada
          this.heroesService.borrarHeroe(this.heroe.id!)
            .subscribe(resp => {
              this.router.navigate(['/heroes']);
              this.mostrarSnackBar('Héroe borrado');
            })
        }
      }
    )
    // this.heroesService.borrarHeroe(this.heroe.id!)
    //   .subscribe(resp=>{
    //     this.router.navigate(['/heroes']);
    //     this.mostrarSnackBar('Héroe borrado');
    //   })
  }

  mostrarSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'OK!', {
      duration: 2500
    })
  }
}
