import { ApiResponse } from "../interfaces/api-response.interface";

export class SuccessResponse implements ApiResponse {
    constructor (infoMessage: string, data? : any) {
        this.success = true;
        this.message = infoMessage;
        this.data = data;
    };
    message: string;
    data: any[];
    errorMessage: any;
    error: any;
    success: boolean;
}

export class ErrorResponse implements ApiResponse {
    constructor (infoMessage:string, error?: any) {
        this.success = false;
        this.message = infoMessage;
        this.error = error;
    };
    message: string;
    data: any[];
    errorMessage: any;
    error: any;
    success: boolean;
}