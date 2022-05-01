import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks$: Observable<Task[]> = this.taskService.tasks$;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks$()
      .subscribe();
  }

  addTask(task: Task): void {
    this.taskService.addTask$(task)
      .subscribe();
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask$(task)
      .subscribe();
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder$(task)
      .subscribe();
  }
}
