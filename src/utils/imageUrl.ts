const getBaseUrl = () => {
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  return baseURL;
};

// Convert relative URLs to absolute URLs with the correct backend base
export const getImageUrl = (url: string) => {
  if (!url) return '';
  
  // If it's already an absolute URL, return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  return `${getBaseUrl()}/${url}`;
}; 