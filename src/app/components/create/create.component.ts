import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
  }

  createTodo(): void {
    this.formataData()
    this.service.createTodo(this.todo).subscribe((resposta) => {
      this.service.message('Success to create new Task!')
      this.navigateToHome()
    }, err => {
      this.service.message('Fail to create new Task!')
      this.navigateToHome()
    })
  }

  navigateToHome(): void {
    this.router.navigate([''])
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }

}
