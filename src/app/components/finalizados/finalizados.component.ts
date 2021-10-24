import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-finalizados',
  templateUrl: './finalizados.component.html',
  styleUrls: ['./finalizados.component.css']
})
export class FinalizadosComponent implements OnInit {

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
       }
     }))
    })
  }

  public restoreTodo(item: Todo): void {
    this.service.restoreTodo(item).subscribe((resposta) => {
      if(resposta !== null){
        this.service.message('Task restaurada com sucesso!')
        this.listFinished = this.listFinished.filter(todo => todo.id !== item.id)
        if(this.listFinished.length <= 0){
          this.voltar()
        }
      }
    })

  }

  public voltar(): void{
    this.router.navigate([''])
  }

}
