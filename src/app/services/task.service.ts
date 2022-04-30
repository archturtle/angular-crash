import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { BehaviorSubject, Observable, map, withLatestFrom } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private static API_URL: string = 'http://localhost:3000/tasks';
  private static HTTP_OPTIONS: object = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private _tasks: BehaviorSubject<Array<Task>> = new BehaviorSubject<Array<Task>>([]);
  public readonly tasks$: Observable<Array<Task>> = this._tasks.asObservable();

  constructor(private httpClient: HttpClient) { }

  static getTaskSpecificURL(id: number | undefined): string {
    return `${TaskService.API_URL}/${id}`;
  }

  getTasks(): void {
    this.httpClient.get<Task[]>(TaskService.API_URL)
      .subscribe((tasks: Task[]) => {
        this._tasks.next(tasks);
      });
  }

  addTask(task: Task): void {
    this.httpClient.post<Task>(TaskService.API_URL, task, TaskService.HTTP_OPTIONS)
      .subscribe((newTask: Task) => {
        this._tasks.next([ ...this._tasks.getValue(), newTask ]);
      });
  }

  updateTaskReminder(task: Task): void {
    this.httpClient.put<Task>(TaskService.getTaskSpecificURL(task.id), task, TaskService.HTTP_OPTIONS)
      .pipe(
        withLatestFrom(this.tasks$),
        map(([updatedTask, currentTasks]) => {
          return currentTasks.map((task: Task) => {
            return task.id === updatedTask.id ? updatedTask : task
          });
        }),
      )
      .subscribe((tasks: Task[]) => {
        this._tasks.next(tasks);
      });
  }

  deleteTask(task: Task): void {
    this.httpClient.delete<Task>(TaskService.getTaskSpecificURL(task.id))
      .pipe(
        withLatestFrom(this.tasks$),
        map(([deletedTask, currentTasks]) => {
          return currentTasks.filter((t: Task) => {
            return t.id != task.id;
          });
        }),
      )
      .subscribe((tasks: Task[]) => {
        this._tasks.next(tasks);
      });
  }
}
