import { environment } from './../../environments/environment';
import { Todo } from './../models/todo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { isNgTemplate } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  baseUrl = environment.baseUrl

  constructor(private httpClient: HttpClient, private snack: MatSnackBar) { }

  findAll(): Observable<Todo[]> {
    return this.httpClient.get<Todo[]>(this.baseUrl);
  }

  findById(id: any): Observable<Todo> {
    const URL = `${this.baseUrl}/${id}`
    return this.httpClient.get<Todo>(URL)
  }


  createTodo(todo: Todo): Observable<Todo> {
    const URL = `${this.baseUrl}/create`
    return this.httpClient.post<Todo>(URL, todo)
  }

  updateTodo(todo: Todo): Observable<Todo> {
    const URL = `${this.baseUrl}/${todo.id}`
    return this.httpClient.put<Todo>(URL, todo)
  }

  deleteTodo(id: any): Observable<void> {
    const URL = `${this.baseUrl}/${id}`
    return this.httpClient.delete<void>(URL)
  }

  restoreTodo(todo: Todo): Observable<Todo>{
    todo.finalizado = false
    const URL = `${this.baseUrl}/${todo.id}`
    return this.httpClient.put<Todo>(URL, todo)
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'Ok',
      {
        horizontalPosition: 'end',
        verticalPosition: 'top',
        duration: 4000
      })
  }

}
