
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MATERIAL_IMPORTS } from '../../../material.imports';
import { OverlayRef } from '@angular/cdk/overlay';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MessageListComponent,
        MessageInputComponent,
        MATERIAL_IMPORTS
    ],
})
export class ChatComponent {

    private _unsubscribeAll: Subject<any> = new Subject();
    
    @Output() closeOverlay = new EventEmitter<void>();
    
    /**
     * Constructor
     */
    constructor(
        // private bottomSheetRef: MatBottomSheetRef<ChatComponent>
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
     * Close the chatbot panel
     */
    onClose(): void {
        this.closeOverlay.emit();
    }
}