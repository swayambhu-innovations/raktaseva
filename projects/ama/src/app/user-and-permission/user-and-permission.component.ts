import { Component, ComponentRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { AddUserComponent } from "./add-user/add-user.component";
import { AddPermissionComponent } from "./add-permission/add-permission.component";
// import { ConfirmationDialogComponent } from "../Shared/dialog/dialog.component";
import { ConfirmationDialogComponent } from "./dialog/dialog.component";
import { UserPermissionService } from "./service/user-permission.service";
import { AuthService } from "../auth/auth.service";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";
import { LoaderComponent } from "../loader/loader.component";

@Component({
  selector: 'app-user-and-permission',
  standalone: true,
  imports: [CommonModule, LoaderComponent],
  templateUrl: './user-and-permission.component.html',
  styleUrls: ['./user-and-permission.component.scss'],
})
export class UserAndPermissionComponent{
  loading:boolean=true;
  constructor(
    private dialog: MatDialog,
    private UserPermissionService: UserPermissionService,
    private authService: AuthService,
    private router: Router,
  ) {}

  roles: any[] = [];
  users: any[] = [];

  private componentRef: ComponentRef<UserAndPermissionComponent>;

  ngOnInit() {
    setTimeout(()=>{
      this.loading=false;
     },500);
    this.getRole();
    this.getUsers();
  }
  getRole() {
    this.roles = [];
    this.UserPermissionService.getRole().then((roles: any) => {
      roles.docs.map((role: any) => {
        this.roles.push({ roleDetail: role.data(), id: role.id });
      });
    });
  }

  getUsers() {
    this.users = [];
    this.UserPermissionService.getUsers().then((users: any) => {
      users.docs.map((user: any) => {
        this.users.push({ userDetail: user.data(), id: user.id });
      });
    });
  }

  getRoleName(roleId: any) {
    let roleName = "";
    this.roles.map((role) => {
      if (role.id == roleId) roleName = role.roleDetail.roleName;
    });
    return roleName;
  }

  async openAddUserModal() {
    this.dialog
      .open(AddUserComponent, {
        width: "40vw",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
        } else {
        }
      });
    await this.getUsers();
  }

  openAddPermissionModal() {
    this.dialog
      .open(AddPermissionComponent, {
        width: "40vw",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
        } else {
        }
      });
    this.getRole();
  }

  editRole(roleData: any) {
    this.dialog
      .open(AddPermissionComponent, {
        data: { ...roleData },
        width: "40vw",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
        } else {
        }
      });
    this.getRole();
  }
  async editUser(userData: any) {
    this.dialog
      .open(AddUserComponent, {
        data: { ...userData },
        width: "40vw",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
        } else {
        }
      });
    await this.getUsers();
  }

  async deletePermission(roleId: any) {
    this.dialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {
          await this.UserPermissionService.deleteRole(roleId);
          await this.getRole();
          window.location.reload();
        } else {
        }
      });
  }
  

  async deleteUser(userId: any) {
    this.dialog
      .open(ConfirmationDialogComponent, { data: { message: "Are you sure?" } })
      .afterClosed()
      .subscribe(async (result) => {
        if (result) {
          await this.UserPermissionService.deleteUser(userId);
          // Reload the page
          window.location.reload();
        } else {
        }
      });
    this.getUsers();
  }
  

  async changeRoleStatus(id: string, status: boolean) {
    await this.UserPermissionService.updateRoleStatus(id, status);
  }
  async changeUserStatus(id: string, status: boolean) {
    await this.UserPermissionService.updateUserStatus(id, status);
  }
  userpermission() {
    this.router.navigate(['userpermission']);
  }
  dashboard() {
    this.router.navigate(['dashboard']);
  }
  pendingpage() {
    this.router.navigate(['pending']);
  }
  approvepage() {
    this.router.navigate(['approve']);
  }
  cancelpage() {
    this.router.navigate(['cancel']);
  }
  readydonor() {
    this.router.navigate(['readydonor']);
  }

}
