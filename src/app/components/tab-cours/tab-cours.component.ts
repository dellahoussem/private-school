import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { CoursService } from '../../services/cours.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-tab-cours',
  imports: [NgFor, CommonModule],
  templateUrl: './tab-cours.component.html',
  styleUrl: './tab-cours.component.css'
})
export class TabCoursComponent {
coursList: any[] = [];
constructor(private coursService: CoursService) { }

 loadCours() {
    this.coursService.getAllCours().subscribe(
      (response: any[]) => {
        this.coursList = response;
        console.log(this.coursList);
      },
      (error) => {
        console.log("Erreur chargement cours :", error);
      }
    );
  }

ngOnInit(): void {
    this.loadCours();
  }

deleteCours(id: string) {
  if (confirm("Voulez-vous vraiment supprimer ce cours ?")) {
    this.coursService.deleteCours(id).subscribe(
      () => {
        alert("Cours supprimé ✅");
        this.loadCours(); // Recharge la liste après suppression
      },
      (error) => console.log("Erreur lors de la suppression :", error)
    );
  }
}
}