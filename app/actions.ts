'use server'

import { callLLM } from '@/lib/llm-service';

/**
 * Server Action: callAiApi
 * Handles AI API calls with load balancing across multiple providers
 * Automatically falls back to available providers if one fails
 */
export async function callAiApi(message: string): Promise<string> {
  try {
    const response = await callLLM(message);
    return response.content;
  } catch (error) {
    console.error('AI API call failed:', error);
    throw new Error('Failed to get response from AI service. Please try again.');
  }
}

/**
 * Get information about available LLM providers
 */
export async function getLLMProvidersInfo() {
  const { getActiveProviders } = await import('@/lib/llm-providers');
  const activeProviders = getActiveProviders();
  
  return {
    count: activeProviders.length,
    providers: activeProviders.map(p => ({
      id: p.id,
      name: p.name,
      model: p.model,
      priority: p.priority
    }))
  };
}
