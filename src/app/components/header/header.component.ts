import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title: string = 'Task Tracker';
  showAddTaskButton$: Observable<boolean> = this.uiService.showAddTaskButton$;

  constructor(private uiService: UiService, private router: Router) { }

  ngOnInit(): void { }

  toggleAddTask(): void {
    this.uiService.toggleAddTask();
  }

  hasRoute(route: string): boolean {
    return this.router.url == route;
  }
}
