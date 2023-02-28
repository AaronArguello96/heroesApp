import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined;

  get auth():Auth{
    return {...this._auth!}
  }

  constructor(private http:HttpClient) { }

  verificaAutenticacion():Observable<boolean> /*| boolean*/{
    if(!localStorage.getItem('id')){
      return of(false); //El operador of sirve para transformar el false en un observable
      //return false; //La otra forma es añadir | boolean a la función, indicando que puede devolver un booleano también.
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this._auth = auth;
          return true;
        })
      )

    //return of(true);
    //return true;
  }

  login(){
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(auth=>this._auth = auth),
        tap(auth=>localStorage.setItem('id', auth.id)) //De esta forma almacenamos el id del usuario registrado en el localStorage
      );
  }

  logout(){
    this._auth = undefined;
  }
}
