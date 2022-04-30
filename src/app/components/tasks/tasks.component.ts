import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../interfaces/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  tasks!: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks$()
      .subscribe(value => this.tasks = value);
  }

  addTask(task: Task): void {
    this.taskService.addTask$(task)
      .subscribe(value => this.tasks.push(value));
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask$(task)
      .subscribe(() => {
        this.tasks = this.tasks.filter((t: Task) => t.id !== task.id);
      })
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder$(task)
      .subscribe();
  }
}
