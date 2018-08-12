import { Component, OnInit } from '@angular/core';
import { SuperadminService } from "../super-admin/super-admin.component.service";
import { SuperAdmin } from "../super-admin/super-admin";
import { clone } from 'lodash';
@Component({
  selector: 'app-adminlist',
  templateUrl: './adminlist.component.html',
  styleUrls: ['./adminlist.component.css']
})
export class AdminlistComponent implements OnInit {
  itemsForm: boolean = false;
  editItemsForm: boolean = false;
  isNewForm: boolean;
  isDonorLogin: boolean = true;
  isSuperAdminLogin: boolean = false;
  isRecieverLogin: boolean = false;
  isShowStock: boolean = false;
  newItems: any = {
    type: 'admin',
    details: {
      bloodStocks: {
        A_pos: 0,
        A_neg: 0,
        B_pos: 0,
        B_neg: 0,
        AB_pos: 0,
        AB_neg: 0,
        O_pos: 0,
        O_neg: 0,

      }
    }
  };
  editedItems: any = {};

  data;
  stocks;
  bloodBankName;
  constructor(private _itemService: SuperadminService) { }

  ngOnInit() {
    this.getItems();
    this.ShowDetails();
    console.log(this.data, "dorno login")
  }

  validateSignup(body) {
    console.log(body, "body")
    var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[0-9])))(?=.{6,})");
    if (body.name != null && body.email != null && body.password != null) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(body.email) && mediumRegex.test(body.password)) {
        return true;
      }
    } else {
      return false;
    }   ///*** Add Email regex here as well */

  }
  validationFailed: boolean = false;
  bloodBankSignup(data) {
    console.log(data, "admin signuoo from")
    var recieverData = {
      name: data.name,
      email: data.email,
      password: data.password,
      type: "admin",
      details: {
        contactNumber: data.contactNumber,
        branch: data.branch,
        manager: data.manager
      }
    }
    console.log(recieverData, "out")
    if (this.validateSignup(data)) {
      var url = "signup"
      console.log(data, 'data from form')
      this._itemService.signup(url, data).subscribe(
        (data1) => {
          console.log(data1, "recver data after signup");
        this.itemsForm = false        
          this.getItems()
        },
        (err) => {
          return err
        }
      )
    } else {
      // alert("jffjjfj");
      console.log("in error")

      this.validationFailed = true
    }
  }


  getItems() {
    var url = 'allBloodBankUser' + "/" + "admin";
    console.log(url, "url")
    this._itemService.getItems(url).subscribe(
      (data) => {
        console.log(data.userData, "login reciver data");
        this.data = data.userData;
      },
      (err) => {
        return err
      }
    )
  }
  updateItems(data) {
    console.log(data, "id")
    var url = "editBloodBankUser" + "/" + data._id
    this._itemService.editItems(url, data).subscribe(
      (data) => {
        console.log(data, "fgdfg");
        this.data = data.donorData
        this.getItems()
        this.editItemsForm = false
      },
      (err) => {
        return err
      }
    )
  }


  deleteItems(data) {
    console.log(data, "data")
    var url = 'deleteBloodBankUser'

    this._itemService.deleteItems(url + '/' + data._id).subscribe(data => {
      console.log(data, "data from db")
      this.getItems();
    },
      err => {
        console.error(err, "errpr")
      })
  }


  addItems(data) {
    console.log(data, "daata in add")
    var url = "signup"
    this._itemService.signup(url, data).subscribe(
      (data) => {
        console.log(data, "fgdfg");
        this.data = data.donorData
        this.itemsForm = false
        this.getItems()
      },
      (err) => {
        return err
      }
    )
  }

  showEditItemsForm(items: SuperAdmin) {
    if (!items) {
      this.itemsForm = false;
      return;
    }
    this.editItemsForm = true;
    this.editedItems = clone(items);
  }

  showAdminForm() {
    this.itemsForm = true;
    this.isNewForm = true;
  }

  

  cancelNewItems() {
    this.newItems = {};
    this.itemsForm = false;
  }

  cancelEdits() {
    this.editedItems = {};
    this.editItemsForm = false;
  }

  ShowDetails() {
    var currentUser = localStorage.getItem("currentUser");
    var User = JSON.parse(currentUser);
    console.log(User.type, "eye d")

    switch (User.type) {
      case "donor":
        this.isDonorLogin = false;
        this.isSuperAdminLogin = true;
        break;
      case "reciever":
        this.isRecieverLogin = true;
        this.isDonorLogin = false;

    }
  }
  showmessage() {
    console.log("Thanks for donating us")
  }
  showStock(data) {
    console.log(data,"stock data")
    this.stocks = data.details.bloodStocks
    this.bloodBankName = data.name
    this.isShowStock = true;
  }
  hideStock() {
    this.isShowStock = false;
  }

}