import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Region } from 'src/app/models/region.model';
import { Responsible } from 'src/app/models/responsible.model';
import { Role } from 'src/app/models/role.model';
import { AuthService } from 'src/app/_services/auth.service';
import { RegionService } from 'src/app/_services/region.service';
import { RoleService } from 'src/app/_services/role.service';

@Component({
  selector: 'app-responsible-add',
  templateUrl: './responsible-add.component.html',
  styleUrls: ['./responsible-add.component.sass']
})
export class ResponsibleAddComponent implements OnInit {
  //responsible: Responsible = new Responsible();
  form: any = {
    username: '',
    password: '',
    fio: '',
    roleByRoleId: null,
    regionByRegionId: null
  };

  roles?: Role[];
  regions?: Region[];
  
  isSuccessful = false;
  errorMessage = '';

  constructor(private authService: AuthService, private roleService: RoleService, private regionService: RegionService, private router: Router) { }

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

  }

  onSubmit(event: any) {
    // this.roleService.getAll().subscribe({
    //   next: data => {
    //     this.responsible.roleByRoleId = data.filter((role: Role) => role.roleNameLocal.includes(event.target.roleByRoleId.value))[0];
    //   }
    // });

    // this.regionService.getAll().subscribe({
    //   next: data => {
    //     this.responsible.regionByRegionId = data.filter((region: Region) => region.regionName.includes(event.target.regionByRegionId.value))[0];
    //   }
    // });

    /*this.responsible.roleByRoleId = this.roles!.filter((role: Role) => role.roleNameLocal.includes(event.target.roleByRoleId.value))[0];
    this.responsible.regionByRegionId = this.regions!.filter((region: Region) => region.regionName.includes(event.target.regionByRegionId.value))[0];

    console.log(this.responsible.roleByRoleId);
    console.log(this.responsible.regionByRegionId);
    console.log(this.responsible);
    */

    this.form.roleByRoleId = this.roles!.filter((role: Role) => role.roleNameLocal.includes(event.target.roleByRoleId.value))[0];
    this.form.regionByRegionId = this.regions!.filter((region: Region) => region.regionName.includes(event.target.regionByRegionId.value))[0];

    this.save();
  }

  save() {
    // this.authService.register(this.responsible.username, this.form.password, this.responsible.fio, this.responsible.roleByRoleId, this.responsible.regionByRegionId).subscribe({
    //   next: data => {
    //     this.isSuccessful = true;
    //     this.navigateToList();
    //   },
    //   error: error => {
    //     this.isSuccessful = false;
    //     this.errorMessage = error.error.message;
    //   }
    // });

    this.authService.register(this.form.username, this.form.password, this.form.fio, this.form.roleByRoleId, this.form.regionByRegionId).subscribe({
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
