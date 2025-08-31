import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Chatmessage } from '../../interfaces/ChatMessage';
import { environment } from '../../../../../environments/environment';
import { Question } from '../../interfaces/Question';

@Injectable({
    providedIn: 'root'
})
export class ChatbotService {

    private _responses: BehaviorSubject<Chatmessage[]> = new BehaviorSubject([]);

    //Service injection
    httpClient = inject(HttpClient);

    constructor(
    ) {

    }

    /**
    * Getter for response list
    */
    get responses$(): Observable<Chatmessage[]> {
        return this._responses.asObservable();
    }

    async setResponse(question: Question) {
        const question$ = this.AskRequest(question);
        let response: any = await lastValueFrom(question$);

        if (response.status == 200) {
            this.newChatbotMessage(response.body);
        }
    }

    newChatbotMessage(message: Chatmessage) {
        // The new response is asign to the list
        const current = this._responses.getValue();

        this._responses.next(current.length == 0 ? [message] : [...current, message]);
    }

    /**
     * Make a Get request
     * @param question object question
     * @returns Observable with the response
     */
    Ask(question: Question) {
        return this.httpClient.post(`${environment.chatbotAPI}/Ask`, question);
    }

    AskRequest(question: Question): Observable<HttpResponse<Chatmessage>> {
        return this.httpClient.post<Chatmessage>(`${environment.chatbotAPI}/Ask`, question, {
            observe: 'response' // 👈 this gives you full HttpResponse
        });
    }

}