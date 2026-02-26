import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { AddCoursComponent } from "../add-cours/add-cours.component";
import { TabCoursComponent } from "../tab-cours/tab-cours.component";

@Component({
  selector: 'app-cours',
  imports: [AddCoursComponent, TabCoursComponent, NgIf],
  templateUrl: './cours.component.html',
  styleUrl: './cours.component.css'
})
export class CoursComponent {

  selectedTab: string = 'list';

selectTab(tab: string) {
  this.selectedTab = tab;
}

}
