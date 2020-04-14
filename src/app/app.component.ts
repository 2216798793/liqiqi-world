import { Component } from '@angular/core';
import { R3TargetBinder } from '@angular/compiler';

const todos = [
  {
    id:1,
    title:'吃饭',
    done: true,
  },
  {
    id:2,
    title:'睡觉',
    done: true,
  },
  {
    id:3,
    title:'写代码',
    done: false,
  },
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public todos:{
    id:number,
    title:string,
    done:boolean,
  }[]=JSON.parse(window.localStorage.getItem('todos') ||'[]' )  


  public visibility: string='all'

  public currentEditing:{
    id:number,
    title:string,
    done:boolean,
  }= null
ngOnInit(){
  this.hashchangeHandler()
  window.onhashchange = this.hashchangeHandler.bind(this)
}
ngDoCheck(){
  window.localStorage.setItem('todos', JSON.stringify(this.todos))
}

get filterTodos(){
  if (this.visibility === 'all'){
  return this.todos
}else if (this.visibility === 'active'){
  return this.todos.filter(t => !t.done)
}else if(this.visibility === 'Completed'){
  return this.todos.filter(t => t.done)
 }
}

  addTodo (e): void {
    const titleText = e.target.value
    if (!titleText.length) {
      return
    }
    const last= this.todos[this.todos.length -1]
    this . todos . push({
      id: last ? last.id+1: -1,
      title: titleText,
      done: false
  })
  e.target.value=''
  //清除文本框
  console.log(this.todos)
 }

 get toggleAll(){
   return this.todos.every(t =>t.done)
 }
 set toggleAll(val){
   this.todos.forEach(t=>t.done=val)
 }
 removeTodo ( index: number) {
  this. todos. splice(index, 1)
}
saveEdit ( todo,e ) {
  todo.title = e.target.value
  //保存编辑
  this.currentEditing = null
  //去除编辑样式
 
}
handleEditKeyUp (e) {
  const {keyCode,target} = e
  if (keyCode === 27){
    //取消编辑
    //同时把文本框的值恢复原来的值
    target.value = this.currentEditing.title
    this.currentEditing = null
  }
}
get remaningCount(){
  return this. todos. filter(t => !t. done).length
}
hashchangeHandler(){
  const hash = window.location.hash.substr(1)
    console.log(hash)
    switch (hash){
      case '/':
        this.visibility = 'all'
        break;
    case '/active':
        this.visibility = 'active'
        break;  
    case '/completed':
        this.visibility = 'completed'
        break;  
    }
}
clearAllDone(){
  this.todos = this.todos.filter(t =>  !t.done)
}
} 