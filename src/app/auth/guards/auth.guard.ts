import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    //   if(this.authService.auth.id){ //Añadimos la condición de que si hay un usuario registrado 
    //     return true;
    //   }
    // console.log('Bloqueado por canActivate');
    // return false;


    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => { //Con el tap añadimos la comprobación de que si la respuesta de la llamada a la funcion verificaAutenticacion() es falsa, es decir, no existe id del usuario registrado nos redirija a la pantalla del login
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      )

  }

  //El metodo canLoad previene de que pueda cargar el módulo, pero si se ha cargado previamente en sesión dejará cargarlo sin problemas
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    //   if(this.authService.auth.id){ //Añadimos la condición de que si hay un usuario registrado   
    //     return true;
    //   }
    //   // console.log('canLoad:', false);
    //   // console.log(route);
    //   // console.log(segments);
    // console.log('Bloqueado por canLoad');
    // return false;

    return this.authService.verificaAutenticacion()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigate(['./auth/login']);
          }
        })
      )
  }
}
