// src/app/core/http-status.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class HttpStatusService {
    private statusMessages: Record<number, string> = {
        0:   'No se pudo conectar con el servidor. Por favor, verifica tu conexión o intenta más tarde.',
        200: 'Éxito',
        201: 'Creado correctamente',
        204: 'Sin contenido',
        400: 'Solicitud incorrecta',
        401: 'No autorizado – Inicia sesión',
        403: 'Prohibido – Acceso denegado',
        404: 'No encontrado – El recurso solicitado no existe',
        409: 'Conflicto – Solicitud duplicada o inválida',
        422: 'Entidad no procesable – Error de validación',
        500: 'Error interno del servidor – Intenta nuevamente más tarde',
        503: 'Servicio no disponible – Intenta más tarde',
    };

    getMessage(statusCode: number): string {
        return this.statusMessages[statusCode] || `Error inesperado (${statusCode})`;

    }
}
