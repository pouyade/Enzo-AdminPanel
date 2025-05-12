import axios from 'axios';
import { useRouter } from 'vue-router'
import { LoginResponse,User } from '@/types/LoginResponse';

class ApiManager {
  private API_URL: string;
  private api: ReturnType<typeof axios.create>;
  constructor() {
    this.API_URL  =  import.meta.env.VITE_API_URL || 'http://localhost:3000';
    this.api = axios.create({
      baseURL: this.API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

  // Add request interceptor to add auth token
    this.api.interceptors.request.use(
      (axiosConfig) => {
        const adminToken = localStorage.getItem("admin_token");
        if (adminToken) {
          // Ensure headers object exists
          axiosConfig.headers = axiosConfig.headers || {};
          
          // Set Authorization header
          axiosConfig.headers.Authorization = `Bearer ${adminToken}`;
          console.log(`Setting Authorization header for ${axiosConfig.method?.toUpperCase()} ${axiosConfig.url}:`, `Bearer ${adminToken.substring(0, 20)}...`);
        } else {
          console.log(`No token found for request to ${axiosConfig.method?.toUpperCase()} ${axiosConfig.url}`);
        }
        return axiosConfig;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor to handle common errors
    this.api.interceptors.response.use(
    (response) => {
      console.log(`Response from ${response.config.method?.toUpperCase()} ${response.config.url}: ${response.status}`);
      return response;
    },
    (error) => {
      console.error(`API Error for ${error.config?.method?.toUpperCase()} ${error.config?.url}:`, 
        error.response?.data || error.message);
      
      // Handle authentication errors
      if (error.response) {
        const errorMessage = error.response.data?.message || error.response.data?.error;
        
        // Handle token expiration
        if (error.response.status === 403|| (error.response.status === 401 && (
          errorMessage === 'Token expired' || 
          errorMessage === 'Invalid token' ||
          errorMessage === 'No token provided' ||
          errorMessage === 'Unauthorized'
        ))) {
          console.log('Token expired or invalid, redirecting to login');
          this.setAuthorization(null,null);
          const router = useRouter()
          if (router.currentRoute.value.meta.requiresAdmin) {
            router.replace('/login');
          }
          return Promise.reject(new Error('Session expired. Please log in again.'));
        }
      }
      
      return Promise.reject(error);
    }
    );
  }

  // Set base URL for API requests
  setBaseUrl(url: string) {
    this.API_URL = url;
    this.api.defaults.baseURL = url;
  }

  // HTTP methods
  async get<T = any>(url: string, config?: any) {
    return this.api.get<T>(url, config);
  }

  async post<T = any>(url: string, data?: any, config?: any) {
    return this.api.post<T>(url, data, config);
  }

  async put<T = any>(url: string, data?: any, config?: any) {
    return this.api.put<T>(url, data, config);
  }

  async delete<T = any>(url: string, config?: any) {
    return this.api.delete<T>(url, config);
  }

  async patch<T = any>(url: string, data?: any, config?: any) {
    return this.api.patch<T>(url, data, config);
  }
  async setAuthorization(token: string | null,user: User | null) {
    if (token) {
        this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('admin_token', token)
        localStorage.setItem('admin_user', JSON.stringify(user))
    } else {
        delete this.api.defaults.headers.common['Authorization'];
        localStorage.removeItem('admin_token');
        localStorage.removeItem('admin_user');
    }
  }

  async login(loginData:{}){
    const response = await this.post<LoginResponse>('/auth/login', loginData);
    const { token, user }  = response.data;

    if (!user.isAdmin) {
      return 'Access denied. Admin privileges required.';
    }
    this.setAuthorization(token,user);
    return null;
  }
}

export default ApiManager;