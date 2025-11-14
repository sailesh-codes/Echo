// LLM Provider Configuration
export type Provider = {
  id: string;
  name: string;
  baseUrl: string;
  apiKey: string;
  model: string;
  priority: number;
  maxRetries: number;
  retryDelay: number;
  enabled: boolean;
};

// Load environment variables with fallbacks
const getEnv = (key: string, defaultValue?: string): string => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[`NEXT_PUBLIC_${key}`] || defaultValue || '';
  }
  return '';
};

// Define available providers
export const llmProviders: Provider[] = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models',
    apiKey: getEnv('GEMINI_API_KEY', ''),
    model: 'gemini-2.0-flash',
    priority: 1,
    maxRetries: 3,
    retryDelay: 1000,
    enabled: true,
  },
  {
    id: 'openai',
    name: 'OpenAI',
    baseUrl: 'https://api.openai.com/v1',
    apiKey: getEnv('OPENAI_API_KEY', ''),
    model: 'gpt-3.5-turbo',
    priority: 2,
    maxRetries: 3,
    retryDelay: 1000,
    enabled: true,
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    baseUrl: 'https://api.anthropic.com/v1',
    apiKey: getEnv('ANTHROPIC_API_KEY', ''),
    model: 'claude-3-opus-20240229',
    priority: 3,
    maxRetries: 2,
    retryDelay: 1500,
    enabled: true,
  },
  {
    id: 'mistral',
    name: 'Mistral',
    baseUrl: 'https://api.mistral.ai/v1',
    apiKey: getEnv('MISTRAL_API_KEY', ''),
    model: 'mistral-medium',
    priority: 4,
    maxRetries: 3,
    retryDelay: 1000,
    enabled: true,
  },
];

// Get active providers
export const getActiveProviders = (): Provider[] => {
  return llmProviders.filter(provider => provider.enabled && provider.apiKey);
};

// Get provider by ID
export const getProvider = (id: string): Provider | undefined => {
  return llmProviders.find(provider => provider.id === id);
};

// Get random provider
export const getRandomProvider = (): Provider | undefined => {
  const activeProviders = getActiveProviders();
  if (activeProviders.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * activeProviders.length);
  return activeProviders[randomIndex];
};

// Get next available provider using round-robin
let currentProviderIndex = 0;
export const getNextProvider = (): Provider | undefined => {
  const activeProviders = getActiveProviders();
  if (activeProviders.length === 0) return undefined;
  
  const provider = activeProviders[currentProviderIndex];
  currentProviderIndex = (currentProviderIndex + 1) % activeProviders.length;
  
  return provider;
};
