import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Region } from 'src/app/models/region.model';
import { Role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/_services/auth.service';
import { RegionService } from 'src/app/_services/region.service';
import { ResponsibleService } from 'src/app/_services/responsible.service';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-responsible-update',
  templateUrl: './responsible-update.component.html',
  styleUrls: ['./responsible-update.component.sass']
})
export class ResponsibleUpdateComponent implements OnInit {

  form: any = {
    username: '',
    password: '',
    fio: '',
    roleByRoleId: null,
    regionByRegionId: null
  };

  id!: number;

  roleStr?: string;
  regionStr?: string;
  roles?: Role[];
  regions?: Region[];
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private authService: AuthService, private responsibleService: ResponsibleService, private roleService: RoleService, private regionService: RegionService, private route: ActivatedRoute,  private router: Router) { }

  ngOnInit(): void {
    this.roleService.getAll().subscribe({
      next: data => {
        this.roles = data;        
      }
    });


    this.regionService.getAll().subscribe({
      next: data => {
        this.regions = data;
      }
    });

    this.id = this.route.snapshot.params['id'];
    this.responsibleService.getById(this.id).subscribe({
      next: data => {
        this.form = data;
        this.roleStr = this.form.roleByRoleId.roleNameLocal;
        this.regionStr = this.form.regionByRegionId.regionName;
      }
    });
  }

  onSubmit(event: any) {
    this.form.roleByRoleId = this.roles!.filter((role: Role) => role.roleNameLocal.includes(event.target.roleByRoleId.value))[0];
    this.form.regionByRegionId = this.regions!.filter((region: Region) => region.regionName.includes(event.target.regionByRegionId.value))[0];

    this.save();
  }

  save() {
    this.responsibleService.update(this.id, this.form).subscribe({
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
    this.responsibleService.delete(this.id).subscribe({
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
    this.router.navigate(['responsiblemanagement']);
  }
}
