import { Component } from '@angular/core';
import { Role } from './models/role.model';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Учёт мат.ценностей';

  isLoggedIn = false;

  username?: string;
  roleByRoleId: Role = new Role();

  showInventoryManagementPage = false;
  showResponsibleManagementPage = false;
  
  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roleByRoleId = user.roleByRoleId;
      this.username = user.username;

      this.showResponsibleManagementPage = this.roleByRoleId.roleName == ('ROLE_SYSADMIN');
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload;
  }
}
