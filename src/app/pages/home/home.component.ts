import { Component, signal } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: 'Instalar Angular CLI',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear proyecto',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear componentes',
      completed: false
    },
    {
      id: Date.now(),
      title: 'Crear servicio',
      completed: false
    },
  ]);

  changeHandler = (event: Event):void => {
    const input = event.target as HTMLInputElement;
    const newTask = input.value;
    this.addTask(newTask);
    
  }
  addTask = (title: string) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  }
  updateTask = (index: number) => {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if(position === index) {
          return {
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }
  deleteTask = (index: number) => {
    this.tasks.update((tasks) => tasks.filter((task, position) => position != index));
  }

}
