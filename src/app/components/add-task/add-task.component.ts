import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Task } from '../../interfaces/task';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  subscription!: Subscription;
  showAddTask!: boolean;

  text!: string;
  day!: string;
  reminder: boolean = false;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle().subscribe(value => this.showAddTask = value);
  }

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
