import { Router } from '@angular/router';
import { TodoService } from './../../services/todo.service';
import { Todo } from './../../models/todo';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {

  public closed: number = 0

  public list: Todo[] = []

  public listFinished: Todo[] = []

  constructor(private service: TodoService, private router: Router) { }

  ngOnInit(): void {
    this.findAll()
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
     resposta.forEach((todo => {
       if(todo.finalizado){
         this.listFinished.push(todo)
       } else {
         this.list.push(todo)
       }
     }))
      this.closed = this.listFinished.length
    })
  }

  finalizarTodo(item: Todo): void {
    item.finalizado = true
    let date = new Date().toLocaleDateString()
    item.dataParaFinalizar = date
    this.service.updateTodo(item).subscribe(() => {
      this.service.message('Task finished with success!')
        this.list = this.list.filter(todo => todo.id != item.id)
        this.closed++
        if(this.list.length <= 0 ){
          this.navegarParaCreate()
        }
    })

  }

  public deleteTodo(id: any): void{
    this.service.deleteTodo(id).subscribe((resposta) => {
      if(resposta === null){
        this.service.message('Task deleted with success!')
        this.list = this.list.filter(todo => todo.id != id)
      }
    })
  }

  navegarParaFinalizados(): void {
    this.router.navigate(['finalizados'])
  }

  navegarParaCreate(): void{
    this.router.navigate(['create'])
  }
}
