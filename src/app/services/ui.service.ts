import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _showAddTaskButton: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public readonly showAddTaskButton$: Observable<boolean> = this._showAddTaskButton.asObservable();

  constructor() { }

  toggleAddTask(): void {
    this._showAddTaskButton.next(
      !this._showAddTaskButton.getValue()
    );
  }
}
