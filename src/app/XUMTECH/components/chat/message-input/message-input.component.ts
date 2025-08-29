
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../../material.imports';

@Component({
    selector: 'message-input',
    templateUrl: './message-input.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MATERIAL_IMPORTS
    ],
})
export class MessageInputComponent {

    private _unsubscribeAll: Subject<any> = new Subject();

    message = '';

    /**
     * Constructor
     */
    constructor(

    ) {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    /**
     * Metho for send the message
     * @returns 
     */
    sendMessage() {
        if (!this.message.trim()) return;
        console.log('Sending:', this.message);
        this.message = '';
    }
}