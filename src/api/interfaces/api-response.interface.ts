export interface ApiResponse {
    success: boolean;
    message: string;
    errorMessage: string;
    data: any[];
    error: any;
}

// success: true => message, data
// success: false => errorMessage, error