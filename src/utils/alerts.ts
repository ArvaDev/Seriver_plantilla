export const notFoundAlert404 = (message: string) => ({
    message,
    status: 404,
    error: "El recurso solicitado no fue encontrado en este servidor."
});

export const serverErrorAlert500 = () => ({
    message: "Error Interno del Servidor",
    status: 500,
    error: "Error Interno del Servidor"
});

export const badRequestAlert400 = (message: string) => ({
    message,
    status: 400,
    error: "Solicitud Incorrecta"
});

export const unauthorizedAlert401 = (message: string) => ({
    message,
    status: 401,
    error: "No Autorizado"
});

export const forbiddenAlert403 = (message: string) => ({
    message,
    status: 403,
    error: "Prohibido: No tienes permiso para acceder a este recurso."
});

export const conflictAlert409 = (message: string) => ({
    message,
    status: 409,
    error: "Conflicto: El recurso ya existe o hay un conflicto de datos."
});

export const unprocessableEntityAlert422 = (message: string) => ({
    message,
    status: 422,
    error: "Entidad No Procesable: La solicitud está bien formada pero no pudo ser procesada debido a errores semánticos."
});

export const tooManyRequestsAlert429 = (message: string) => ({
    message,
    status: 429,
    error: "Demasiadas Solicitudes: Has enviado demasiadas solicitudes en un período de tiempo determinado."
});

export const successfulAlert200 = (message: string, content: any = null) => ({
    message,
    status: 200,
    error: null,
    content
});
