import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root' // So it can be injected anywhere
})
export class FormatterService {
    
    private pad(n: number, digits = 2): string {
        return n.toString().padStart(digits, '0');
    }

    /**
     * Returns local ISO 8601-like string with offset: "2025-08-29T14:51:44.6230000-06:00"
     */
    getLocalIsoWithOffset(date: Date = new Date()): string {
        const year = date.getFullYear();
        const month = this.pad(date.getMonth() + 1);
        const day = this.pad(date.getDate());
        const hour = this.pad(date.getHours());
        const minute = this.pad(date.getMinutes());
        const second = this.pad(date.getSeconds());
        const millis = this.pad(date.getMilliseconds(), 3) + '0000'; // simulate 7 digits

        // Timezone offset
        const offset = -date.getTimezoneOffset(); // in minutes
        const sign = offset >= 0 ? '+' : '-';
        const offsetHours = this.pad(Math.floor(Math.abs(offset) / 60));
        const offsetMinutes = this.pad(Math.abs(offset) % 60);

        return `${year}-${month}-${day}T${hour}:${minute}:${second}.${millis}${sign}${offsetHours}:${offsetMinutes}`;
    }
}


