// filepath: /sunoapi-js-sdk/src/models/response.ts

export class Response {
    message: string;
    task_id: string;

    constructor(message: string, task_id: string) {
        this.message = message;
        this.task_id = task_id;
    }
}