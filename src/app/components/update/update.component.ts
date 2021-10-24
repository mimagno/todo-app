import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public todo: Todo = {
    titulo: '',
    descricao: '',
    dataParaFinalizar: new Date(),
    finalizado: false
  }

  constructor(private service: TodoService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.todo.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.todo.id).subscribe((response) => {
      this.todo = response
    })
  }

  navigateToHome(): void {
    this.router.navigate([''])
  }

  updateTodo(): void {
    this.formataData()
    this.service.updateTodo(this.todo).subscribe((resposta) => {
      this.service.message('Success to update new Task!')
      this.navigateToHome()
    }, err => {
      this.service.message('Fail to update new Task!')
      this.navigateToHome()
    })
  }

  formataData(): void {
    let data = new Date(this.todo.dataParaFinalizar)
    this.todo.dataParaFinalizar = `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`
  }
}
