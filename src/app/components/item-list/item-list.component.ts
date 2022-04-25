import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { CsvExportService } from 'src/app/_services/csv-export.service';
import { ItemService } from 'src/app/_services/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  items?: Item[];
  allItems?: Item[];

  constructor(private itemService: ItemService, private csvExportService: CsvExportService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.itemService.getAll().subscribe({
      next: data => {
        this.allItems = data;
        this.items = this.allItems;
      },
      error: error => {

      }
    });
  }

  saveTable() {
    this.csvExportService.downloadFile(this.items!, 'ItemsList', ['itemId', 'itemName', 'inventoryNumber', 'serialNumber', 'description', 'responsibleByResponsibleId', 'arrived']);
  }

  navigateAdd() {
    this.router.navigate(['itemmanagement/add'])
  }

  navigateUpdate(id: number) {
    this.router.navigate(['itemmanagement/update', id])
  }

  navigateAttachments(id: number) {
    this.router.navigate(['itemmanagement/attachments', id])
  }

  applyFilter(event: any) {
    let filterValueLower = event.target.value.toLowerCase();
    if (event.target.value === '') {
      this.items = this.allItems;
    } else {
      this.items = this.items?.filter((item: Item) => 
      item.itemName?.toLowerCase().includes(filterValueLower)
      || item.inventoryNumber?.toLowerCase().includes(filterValueLower)
      || item.serialNumber?.toLowerCase().includes(filterValueLower)
      || item.responsibleByResponsibleId.fio?.toLowerCase().includes(filterValueLower)
      || item.responsibleByResponsibleId.regionByRegionId.regionName?.toLowerCase().includes(filterValueLower));
    }
  }

  //TODO: Добавить сортировку
}
