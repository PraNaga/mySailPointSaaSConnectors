
export interface HTTP {

    get<T = any>(url: string, data?: any): any

    post<T = any>(url: string, data?: any): any
}