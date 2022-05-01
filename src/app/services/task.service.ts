import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
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

  private _tasks: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>([]);
  public readonly tasks$: Observable<Task[]> = this._tasks.asObservable();

  constructor(private httpClient: HttpClient) { }

  static getTaskSpecificURL(id: number | undefined): string {
    return `${TaskService.API_URL}/${id}`;
  }

  getTasks$(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(TaskService.API_URL)
      .pipe(tap({
        next: (value: Task[]) => { this._tasks.next(value); }
      }));
  }

  addTask$(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(TaskService.API_URL, task, TaskService.HTTP_OPTIONS)
      .pipe(tap({
        next: (value: Task) => { this._tasks.next([...this._tasks.getValue(), value]); }
      }));
  }

  updateTaskReminder$(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(TaskService.getTaskSpecificURL(task.id), task, TaskService.HTTP_OPTIONS)
      .pipe(tap({
        next: (value: Task) => {
          this._tasks.next(
            this._tasks.getValue().map(t => { return t.id === value.id ? value : t; })
          );
        }
      }));
  }

  deleteTask$(task: Task): Observable<void> {
    return this.httpClient.delete<void>(TaskService.getTaskSpecificURL(task.id))
      .pipe(tap({
        next: () => {
          this._tasks.next(
            this._tasks.getValue().filter(t => { return t.id != task.id; })
          );
        }
      }));
  }
}
