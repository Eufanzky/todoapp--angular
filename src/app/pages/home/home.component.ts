import { Component, Injector, computed, effect, inject, signal } from '@angular/core';

import { Task } from '../../models/task.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  tasks = signal<Task[]>([]);
  filter = signal<'all' | 'pending' | 'completed'>('all');
  tasksByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  });

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required],
  });


  injector = inject(Injector);

  constructor() {

  }

  ngOnInit() {
    const storage = localStorage.getItem("tasks");
    if (storage) {
      const tasks = JSON.parse(storage);
      console.log(tasks);

      this.tasks.set(tasks);
    }
    this.trackTasks();
  }

  trackTasks () {
    effect(() => {
      const tasks = this.tasks();
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, {injector: this.injector});
  }

  changeHandler = (): void => {
    if (this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if (value !== '') {
        this.addTask(value);
        this.newTaskCtrl.setValue('');
      }
    }
  };
  addTask = (title: string) => {
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) => [...tasks, newTask]);
  };
  updateTask = (id: number) => {
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      });
    });
  };
  deleteTask(id: number) {
    this.tasks.update((tasks) => tasks.filter((task) => task.id !== id));
  }

  updateTaskEditingMode = (id: number) => {
    this.tasks.update((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            editing: true,
          };
        }
        return {
          ...task,
          editing: false,
        };
      });
    });
  };

  updateTaskText = (id: number, event: Event) => {
    const input = event.target as HTMLInputElement;
    this.tasks.update((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: input.value,
            editing: false,
          };
        }
        return task;
      });
    });
  };

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
