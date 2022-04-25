import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Responsible } from 'src/app/models/responsible.model';
import { ItemService } from 'src/app/_services/item.service';
import { ResponsibleService } from 'src/app/_services/responsible.service';

@Component({
  selector: 'app-item-update',
  templateUrl: './item-update.component.html',
  styleUrls: ['./item-update.component.sass']
})
export class ItemUpdateComponent implements OnInit {
  form: any = {
    itemName: '',
    inventoryNumber: '',
    serialNumber: '',
    description: '',
    responsibleByResponsibleId: null,
    arrived: null
  };

  id!: number;

  responsibleStr?: string;
  responsibles?: Responsible[];
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private itemService: ItemService, private responsibleService: ResponsibleService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.responsibleService.getAll().subscribe({
      next: data => {
        this.responsibles = data;        
      }
    });

    this.id = this.route.snapshot.params['id'];
    this.itemService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
        this.responsibleStr = this.form.responsibleByResponsibleId.fio;
      }
    });
  }

  onSubmit(event: any) {
    this.form.responsibleByResponsibleId = this.responsibles!.filter((responsible: Responsible) => responsible.fio.includes(event.target.responsibleByResponsibleId.value))[0];
    
    this.save();
  }

  private save() {
    this.itemService.update(this.id, this.form).subscribe({
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

  delete() {
    this.itemService.delete(this.id).subscribe({
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
