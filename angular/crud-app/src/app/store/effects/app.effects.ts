import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromCustomerActions from '../actions/customer.action'; 
import { CustomerService } from '../../services/customer.service';

@Injectable()
export class CustomerEffects {
    
    constructor(private action$: Actions, private customerService: CustomerService) { }

    @Effect()
    loadCustomers$ : Observable<Action> = this.action$.pipe(
        ofType(fromCustomerActions.LOAD_CUSTOMERS), 
        switchMap(() => this.customerService.getCustomers()
        .pipe(
            map( response => 
                new fromCustomerActions.LoadCustomerSuccess(response), 
                catchError(error => of(new fromCustomerActions.LoadCustomerFail(error)))    
            )
        ))
    );

    //Update Customer
    @Effect()
    updateCustomer$ : Observable<Action> = this.action$.pipe(
        ofType(fromCustomerActions.UPDATE_CUSTOMER),
        map((action: fromCustomerActions.UpdateCustomer) => action.payload),
        switchMap((payload) => this.customerService.updateCustomer(payload)
            .pipe(
                map(updateCustomer => new fromCustomerActions.UpdateCustomerSuccess({
                    id: updateCustomer['id'],
                    changes: updateCustomer
                })),
                catchError(error => of(new fromCustomerActions.UpdateCustomerFail(error)))
            )
        )
    );

    //Add Customer
    @Effect()
    addCustomer$ : Observable<Action> = this.action$.pipe(
        ofType(fromCustomerActions.ADD_CUSTOMER),
        map((action: fromCustomerActions.AddCustomer) => action.payload),
        switchMap((payload) => this.customerService.addCustomer(payload)
            .pipe(
                map(response => new fromCustomerActions.AddCustomerSuccess(response)),
                catchError(error => of(new fromCustomerActions.AddCustomerFail(error)))
            )
        )
    );

    //Delete Customer
    @Effect()
    deleteCustomer$ : Observable<Action> = this.action$.pipe(
        ofType(fromCustomerActions.DELETE_CUSTOMER),
        map((action: fromCustomerActions.DeleteCustomer) => action.payload),
        switchMap((payload: number) => this.customerService.deleteCustomer(payload)
            .pipe(
                map(() => new fromCustomerActions.DeleteCustomerSuccess(payload)),
                catchError(error => of(new fromCustomerActions.DeleteCustomerFail(error)))
            )
        )
    );

    

}