import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Responsible } from 'src/app/models/responsible.model';
import { ItemService } from 'src/app/_services/item.service';
import { ResponsibleService } from 'src/app/_services/responsible.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.sass']
})
export class ItemAddComponent implements OnInit {
  form: any = {
    itemName: '',
    inventoryNumber: '',
    serialNumber: '',
    description: '',
    responsibleByResponsibleId: null,
    arrived: null
  };

  responsibles?: Responsible[];
  
  isSuccessful = false;
  errorMessage = '';


  constructor(private itemService: ItemService, private responsibleService: ResponsibleService, private router: Router) { }

  ngOnInit(): void {
    this.responsibleService.getAll().subscribe({
      next: data => {
        this.responsibles = data;        
      }
    });
  }

  onSubmit(event: any) {
    this.form.responsibleByResponsibleId = this.responsibles!.filter((responsible: Responsible) => responsible.fio.includes(event.target.responsibleByResponsibleId.value))[0];
    this.save();
  }

  save() {
    this.itemService.add(this.form).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.navigateToList();
      },
      error: error => {
        this.isSuccessful = false;
        this.errorMessage = error.error.message;
      }
    });
  }

  navigateToList() {
    this.router.navigate(['itemmanagement']);
  }
}
