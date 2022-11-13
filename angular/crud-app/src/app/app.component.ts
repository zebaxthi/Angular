import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from './store';
import { Customer } from './models/customer.model';
import { CustomerService } from './services/customer.service';
import { NgForm } from '@angular/forms';
import { UpdateCustomer } from './store/actions/customer.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  customers: Customer[] = [];
  display: string = 'none';
  isEditModeEnabled: boolean = false;
  persona: Customer = {};
  usuarioInput: string;

  constructor(private store: Store<fromStore.AppState>, private customerService: CustomerService){
    store.select(fromStore.getCustomers).subscribe(resp => this.customers = resp);
    // store.select(fromStore.getCustomersById(1)).subscribe(resp => console.log(resp));
  }

  ngOnInit(): void {
      this.store.dispatch(new fromStore.fromCustomerActions.LoadCustomer);
  }

  editClient(customer: Customer){
    this.isEditModeEnabled = true;
    this.persona = {...customer};
    this.display = 'block';
  }

  deleteClient(customeId){
    if(customeId !== undefined){
      if(confirm('¿Estas seguro de borrar este usuario?')){
        this.store.dispatch(new fromStore.fromCustomerActions.DeleteCustomer(customeId));
      }
    }
  }

  addCustomer(myForm: NgForm){
    let userId = new Date().getTime();
    let newCustomer = myForm.value;
    newCustomer['id'] = userId;
    
    if(newCustomer.name !== null &&newCustomer !== undefined){
      this.store.dispatch(new fromStore.fromCustomerActions.AddCustomer(newCustomer));
      this.closeModal(myForm);
    }
  } 

  updateCustomer(myForm: NgForm){
    this.store.dispatch(new fromStore.fromCustomerActions.UpdateCustomer(myForm.value));
    this.closeModal(myForm);
  }

  openModalDialog(){
    this.isEditModeEnabled = false;
    this.display = 'block';
  }

  closeModal(myForm: NgForm){
    myForm.reset();
    this.display = 'none';
  }



}
