
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { MATERIAL_IMPORTS } from '../../../../material.imports';
import { Chatmessage } from '../../../core/interfaces/ChatMessage';

@Component({
    selector: 'message-list',
    templateUrl: './message-list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MATERIAL_IMPORTS
    ],
    styles: [
        `.enter-animation {
            animation: slide-fade 1s;
            }
            @keyframes slide-fade {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }`
    ]
})
export class MessageListComponent {

    private _unsubscribeAll: Subject<any> = new Subject();

    @Input('messages') messages: Chatmessage[] = [];

    // @ViewChild('chatContainer') chatContainer!: ElementRef;

    @ViewChildren('messageElements') messageElements!: QueryList<ElementRef>;

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
     * AfterViewChecked 
     */
    ngAfterViewChecked() {
        this.scrollToLastMessage();
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
    scrollToLastMessage() {
        const items = this.messageElements.toArray();
        const last = items[items.length - 1];
        if (last) {
            last.nativeElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
}