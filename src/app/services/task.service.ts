import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
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

  constructor(private httpClient: HttpClient) { }

  static getTaskSpecificURL(id: number | undefined): string {
    return `${TaskService.API_URL}/${id}`;
  }

  getTasks$(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(TaskService.API_URL);
  }

  addTask$(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(TaskService.API_URL, task, TaskService.HTTP_OPTIONS);
  }

  updateTaskReminder$(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(TaskService.getTaskSpecificURL(task.id), task, TaskService.HTTP_OPTIONS);
  }

  deleteTask$(task: Task): Observable<Task> {
    return this.httpClient.delete<Task>(TaskService.getTaskSpecificURL(task.id));
  }
}
