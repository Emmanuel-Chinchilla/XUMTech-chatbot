import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Chatmessage } from '../interfaces/ChatMessage';
import { environment } from '../../../../../environments/environment';
import { Question } from '../interfaces/Question';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    private _responses: BehaviorSubject<Chatmessage[]> = new BehaviorSubject([]);

    constructor(
        private _httpClient: HttpClient
    ) {

    }

    /**
    * Getter for response list
    */
    get responses$(): Observable<Chatmessage[]> {
        return this._responses.asObservable();
    }

    async setResponse(question: Question) {
        const question$ = this.Ask(question);
        let response: any = await lastValueFrom(question$);

        console.log(response);

        // if (response.status == 200) {
        //     // The new response is asign to the list
        //     const current = this._responses.getValue();
        //     this._responses.next([...current, ...response.detail]);
        // }
    }

    public newChatbotMessage(message: Chatmessage) {
        // The new response is asign to the list
        const current = this._responses.getValue();
        this._responses.next([...current, message]);
    }

    /**
     * Make a Get request
     * @param question object question
     * @returns Observable with the response
     */
    Ask(question: Question) {
        return this._httpClient.post(`${environment.chatbotAPI}/Ask`, question);
    }

}