// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-permission',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-permission.component.html',
//   styleUrl: './add-permission.component.scss'
// })
// export class AddPermissionComponent {

// }






import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
// import { MAT_DIALOG_DATA } from "@angular/material/dialog";
// import { Dialog } from "@angular/cdk/dialog";
// import { UserPermissionService } from "../service/user-permission.service";
import {  ReactiveFormsModule} from "@angular/forms";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Dialog } from "@angular/cdk/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UserPermissionService } from "../service/user-permission.service";
import { AuthService } from "../../auth/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-add-permission',
  standalone: true,
  imports: [  MatCardModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-permission.component.html',
  styleUrl: './add-permission.component.scss'
})
export class AddPermissionComponent {
  constructor(
    private dialog: Dialog,
    private UserPermissionService: UserPermissionService,
    public auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isDashboard = false;
  isSettingsPage = false;

  roleForm: FormGroup = new FormGroup({
    roleName: new FormControl("", [Validators.required]),
    // roleId: new FormControl(),
    active: new FormControl(true),
    dashboard: new FormControl(false),
    phoneNumberAddress: new FormControl("hide"),
    // otp: new FormControl(false),
 
  });

  ngOnInit() {
    if (this.data) {
      this.roleForm.setValue(this.data.roleDetail);
      this.roleForm.patchValue({
        roleId: this.data.id,
      });
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  togglePermissions(section: string) {
    switch (section) {
      case "Dashboard":
        this.isDashboard = !this.isDashboard;
        break;
      default:
        console.warn(`Unknown section: ${section}`);
    }
  }

   async onSubmit() {
    if (this.roleForm.valid) {
      await this.UserPermissionService.addRole(this.roleForm.value);
      this. auth.getUserPermissions().then(() => {
        window.location.reload();
      });
      this.roleForm.reset();
      this.closeDialog();
    } else {
    }
  }

}

