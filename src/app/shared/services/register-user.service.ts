import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterUser } from '../model/register-user.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

//Procurar por api para comunicação via http.
export class RegisterUserService {
  //Video top para firebase
  //https://www.youtube.com/watch?v=YDNJ_lQuYeY
  //Incluir URL da api http
  private apiUrl = '';
  constructor(private http:HttpClient) { }

  create(model: IRegisterUser): Observable<IRegisterUser>{
    return this.http.post<IRegisterUser>(`${this.apiUrl}`,model);
  }
  update(model: IRegisterUser): Observable<IRegisterUser>{
    return this.http.put<IRegisterUser>(`${this.apiUrl}/${model.codClient}`,model);
  }
  get(codClient: number): Observable<IRegisterUser>{
    return this.http.get<IRegisterUser>(`${this.apiUrl}/${codClient}`);
  }
  delete(codClient: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${codClient}`);
  }
  
}
