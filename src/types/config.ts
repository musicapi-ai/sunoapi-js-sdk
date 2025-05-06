// src/types/config.ts

export interface SDKConfig {
    apiKey: string; // Your API key for authentication
    baseUrl?: string; // Optional base URL for the API
}
export interface SunoAPIConfig extends SDKConfig {
    apiKey: string; // Your API key for authentication
    baseUrl?: string; // Optional base URL for the API
    timeout?: number; // Optional timeout for requests in milliseconds
    headers?: Record<string, string>; // Optional custom headers for requests
}
