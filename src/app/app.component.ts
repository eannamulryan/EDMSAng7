import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'edmsAng7';
 
  constructor(private servise: DataService) {}
  
  navLinks = [
    { path: '', label: 'Suspects List' },
    { path: 'suspectReport/0', label: 'Suspect Report' },
  ];
}
