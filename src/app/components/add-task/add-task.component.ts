import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Task } from '../../interfaces/task';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  showAddTaskButton$: Observable<boolean> = this.uiService.showAddTaskButton$;

  text!: string;
  day!: string;
  reminder: boolean = false;

  constructor(private uiService: UiService) { }

  ngOnInit(): void { }

  onSubmit(): void {
    if (!this.text) return alert('Please add a task!');

    this.onAddTask.emit({
      text: this.text,
      day: this.day,
      reminder: this.reminder
    });

    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
