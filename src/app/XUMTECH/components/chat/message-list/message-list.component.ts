
import { CommonModule } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MATERIAL_IMPORTS } from '../../../../material.imports';
import { Chatmessage } from '../../../core/services/interfaces/ChatMessage';

@Component({
    selector: 'message-list',
    templateUrl: './message-list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MATERIAL_IMPORTS
    ],
})
export class MessageListComponent {

    private _unsubscribeAll: Subject<any> = new Subject();

    @Input('messages') messages: Chatmessage[] = [];

    // messages = [
    //     { user: 'Alice', text: 'Hi there!' },
    //     { user: 'Bob', text: 'Hello Alice!' },

    // ];

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

}