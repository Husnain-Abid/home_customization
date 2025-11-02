// API Configuration for Backend Server
export const API_CONFIG = {
    // Backend server URL
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
    
    // API Endpoints
    ENDPOINTS: {
        // Send email with PDF attachment (file upload)
        SEND_EMAIL: '/api/send-email',
        
        // Send email with base64 PDF
        SEND_EMAIL_BASE64: '/api/send-email-base64',
        
        // Health check
        HEALTH: '/api/health'
    },
    
    // Get full URL for endpoint
    getUrl: (endpoint: string) => `${API_CONFIG.BASE_URL}${endpoint}`,
    
    // Headers for API requests
    getHeaders: () => ({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    })
}

// API Service functions
export const apiService = {
    // Health check
    async healthCheck() {
        try {
            const response = await fetch(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.HEALTH));
            return await response.json();
        } catch (error) {
            console.error('Health check failed:', error);
            throw error;
        }
    },

    // Send email with PDF file upload
    async sendEmailWithPDF(formData: FormData) {
        try {
            const response = await fetch(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.SEND_EMAIL), {
                method: 'POST',
                body: formData // FormData with file and form fields
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send email');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Send email failed:', error);
            throw error;
        }
    },

    // Send email with base64 PDF
    async sendEmailWithBase64PDF(data: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        message: string;
        totalPrice: string;
        pdfBase64: string;
    }) {
        try {
            const response = await fetch(API_CONFIG.getUrl(API_CONFIG.ENDPOINTS.SEND_EMAIL_BASE64), {
                method: 'POST',
                headers: API_CONFIG.getHeaders(),
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to send email');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Send email failed:', error);
            throw error;
        }
    }
}

// Helper function to convert Blob to base64
export const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // Remove data:application/pdf;base64, prefix
            const base64 = result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

// Helper function to create FormData for file upload
export const createFormData = (data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    totalPrice: string;
    pdfBlob: Blob;
}) => {
    const formData = new FormData();
    
    // Add form fields
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('message', data.message);
    formData.append('totalPrice', data.totalPrice);
    
    // Add PDF file
    formData.append('pdf', data.pdfBlob, 'customized-home-configuration.pdf');
    
    return formData;
};

// Email request interface
export interface EmailRequest {
    firstName: string
    lastName: string
    email: string
    phone: string
    message: string
    totalPrice: string
    productData?: any
    selectedFeatures?: { [key: string]: string }
}

// Email response interface
export interface EmailResponse {
    success: boolean
    message: string
    messageId?: string
    error?: string
} 