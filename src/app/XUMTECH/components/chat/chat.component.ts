
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageInputComponent } from './message-input/message-input.component';
import { MATERIAL_IMPORTS } from '../../../material.imports';
import { OverlayRef } from '@angular/cdk/overlay';
import { ChatbotService } from '../../core/services/chatbot/chatbot.service';
import { Chatmessage } from '../../core/interfaces/ChatMessage';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MessageListComponent,
        MessageInputComponent,
        MATERIAL_IMPORTS,
    ],
})
export class ChatComponent {

    private _unsubscribeAll: Subject<any> = new Subject();

    @Output() closeOverlay = new EventEmitter<void>();

    messages: Chatmessage[] = [];

    //Service injection
    chatbotService = inject(ChatbotService);

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
        // Subscribe to the observer for getting messages
        this.chatbotService.responses$.subscribe((responses) => {
            if (responses.length > 0) {
                this.messages = responses;
            }
        })
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