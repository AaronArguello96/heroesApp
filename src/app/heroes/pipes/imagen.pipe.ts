import { Pipe, PipeTransform } from "@angular/core";
import { Heroe } from "../interfaces/heroes.interface";

@Pipe({
    name: 'imagen',
    //pure: false //Esta propiedad del pipe sirve para que se vuelva a procesar el argumento que viene en el pipe. Por ejemplo, si cambiamos la imagen del heroe se actualizará al momento
    //Como en este caso se modifica una propiedad del objeto Heroe no actualiza el argumento que se le da al pipe.
})
export class ImagenPipe implements PipeTransform {

    transform(heroe: Heroe): string {
        if (!heroe.id && !heroe.alt_img) {
            return `assets/no-image.png`;
        } else if (heroe.alt_img) {
            return heroe.alt_img;
        } else {
            return `assets/heroes/${heroe.id}.jpg`;
        }
    }
}