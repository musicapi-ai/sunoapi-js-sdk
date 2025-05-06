// src/errors/index.ts

export class APIError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "APIError";
    }
}

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ValidationError";
    }
}