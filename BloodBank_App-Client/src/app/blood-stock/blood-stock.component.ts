import { Component, OnInit } from '@angular/core';
import { SuperadminService } from "../super-admin/super-admin.component.service";
import { SuperAdmin } from "../super-admin/super-admin";

@Component({
  selector: 'app-blood-stock',
  templateUrl: './blood-stock.component.html',
  styleUrls: ['./blood-stock.component.css']
})
export class BloodStockComponent implements OnInit {

  editItemsForm: boolean = false;
  isNewForm: boolean;
  newItems: any = {};
  editedItems: any = {
    A_pos: 0,
    A_neg: 0,
    B_pos: 0,
    B_neg: 0,
    AB_pos: 0,
    AB_neg: 0,
    O_pos: 0,
    O_neg: 0,


  };

  stocks;
  data;
  constructor(private _itemService: SuperadminService) { }

  ngOnInit() {
    this.getItems();
  }

  getItems() {
    var currentUser = localStorage.getItem("currentUser")
    var user = JSON.parse(currentUser)
    var url = "bloodBankUser" + "/" + user.UserId
    this._itemService.getItems(url).subscribe(
      (data) => {
        console.log(data.userData.details.bloodStocks, "fgdfg");
        this.stocks = data.userData.details.bloodStocks
        this.data = data.userData
        console.log(this.stocks, "bloockSrtock afasfhaskfkasjhf")
      },
      (err) => {
        return err
      }
    )
  }
  updateItems(value) {
    console.log(value, "update")
    console.log(this.editedItems)
    var updatedData = {
      name: this.data.name,
      email: this.data.email,
      password: this.data.password,
      type: "admin",
      details: {
        bloodStocks:value,
        contactNumber: this.data.contactNumber,
        branch: this.data.branch,
        manager: this.data.manager
      }
    }
    console.log(this.data, "data aftter add stcok")
    var url = "editBloodBankUser" + "/" + this.data._id
    console.log(url, "jhfjhhfjfjfjjhjfjhf")
    this._itemService.editItems(url,updatedData).subscribe(
      (data) => {
        console.log(data, "fgdfg");
        this.data = data.recieverData
    this.editItemsForm = false;
        this.getItems();
      },
      (err) => {
        return err
      }
    )
  }
  addItems(data) {
    var url = "editBloodBankUser"
    this._itemService.addItems(url, data).subscribe(
      (data) => {
        console.log(data, "add items");
        this.data = data.recieverData
        this.getItems()
      },
      (err) => {
        return err
      }
    )
  }
  cancelEdits() {

    this.editItemsForm = false;
  }
  showAdminForm() {
    this.editItemsForm = true;
  }

}
