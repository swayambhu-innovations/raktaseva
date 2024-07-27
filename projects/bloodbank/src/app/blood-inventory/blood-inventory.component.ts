import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { BloodBankService } from '../blood-bank.service';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';

@Component({
  selector: 'app-blood-inventory',
  standalone: true,
  imports: [SidebarComponent, CommonModule],
  templateUrl: './blood-inventory.component.html',
  styleUrls: ['./blood-inventory.component.scss']
})
export class BloodInventoryComponent implements OnInit {
  bloodGroups = [
    { name: 'A+', units: 0 },
    { name: 'B+', units: 0 },
    { name: 'AB+', units: 0 },
    { name: 'O+', units: 0 },
    { name: 'A-', units: 0 },
    { name: 'B-', units: 0 },
    { name: 'AB-', units: 0 },
    { name: 'O-', units: 0 }
  ];

  constructor(private bloodService: BloodBankService, private firestore: Firestore) { }

  ngOnInit(): void {
    this.getPatientDetail();
  }

  async getPatientDetail() {
    // number of unit of blood in inventory already has
    const inventorySnapshot = await getDocs(collection(this.firestore, 'inventory'));
    const inventoryDocs = inventorySnapshot.docs;

    for (const inventory of inventoryDocs) {
      const inventoryData = inventory.data();
      const bloodGroup = this.bloodGroups.find(group => group.name === inventory.id);
      if (bloodGroup) {
        bloodGroup.units = inventoryData['count'] || 0;
      }
    }

    // in this if someone received blood from bank then subtract that unit of blood from inventory
    const requirementSnapshot = await getDocs(collection(this.firestore, 'requirement'));
    const requirementDocs = requirementSnapshot.docs;

    for (const requirement of requirementDocs) {
      const requirementData = requirement.data();
      const bloodGroup = this.bloodGroups.find(group => group.name === requirementData['bloodgroup']);
      if (bloodGroup) {
        bloodGroup.units -= requirementData['fulfilled'] || 0;
      }
    }

  // add if someone donated the blood -
    const donateSnapshot = await getDocs(collection(this.firestore, 'checkup-form'));
    const donatetDocs = donateSnapshot.docs;
     for (const donate of donatetDocs) {
      const donateData = donate.data();
      const bloodGroup = this.bloodGroups.find(group => group.name === donateData['bloodgroup']);
      if (bloodGroup) {
        bloodGroup.units += donateData['unitdonated'] || 0;
      }
    }
  }
}
