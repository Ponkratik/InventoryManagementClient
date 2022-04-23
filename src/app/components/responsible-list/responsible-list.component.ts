import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsible } from 'src/app/models/responsible.model';
import { CsvExportService } from 'src/app/_services/csv-export.service';
import { ResponsibleService } from 'src/app/_services/responsible.service';

@Component({
  selector: 'app-responsible-list',
  templateUrl: './responsible-list.component.html',
  styleUrls: ['./responsible-list.component.sass']
})
export class ResponsibleListComponent implements OnInit {
  responsibles?: Responsible[];
  allResponsibles?: Responsible[];

  constructor(private responsibleService: ResponsibleService, private csvExportService: CsvExportService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.responsibleService.getAll().subscribe({
      next: data => {
        this.allResponsibles = data;
        this.responsibles = this.allResponsibles;
      },
      error: error => {

      }
    });
  }

  saveTable() {
    this.csvExportService.downloadFile(this.responsibles!, 'ResponsiblesList', ['responsibleId', 'username', 'fio', 'role', 'region']);
  }

  navigateAdd() {
    this.router.navigate(['responsiblemanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['responsiblemanagement/update', id])
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.responsibles = this.allResponsibles;
    } else {
      this.responsibles = this.responsibles?.filter((responsible: Responsible) => 
      responsible.username?.toLowerCase().includes(filterValueLower)
      || responsible.fio?.toLowerCase().includes(filterValueLower)
      || responsible.roleByRoleId.roleNameLocal?.toLowerCase().includes(filterValueLower)
      || responsible.regionByRegionId.regionName?.toLowerCase().includes(filterValueLower));
    }
  }

  //TODO: Добавить сортировку
}
