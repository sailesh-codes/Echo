import { getNextProvider, Provider } from './llm-providers';

interface LLMResponse {
  content: string;
  provider: string;
  model: string;
  tokens?: number;
  error?: string;
}

const callLLM = async (message: string, provider?: Provider): Promise<LLMResponse> => {
  // If no specific provider is specified, get the next available one
  const selectedProvider = provider || getNextProvider();
  
  if (!selectedProvider) {
    throw new Error('No active LLM providers available');
  }

  const { id, name, baseUrl, apiKey, model, maxRetries } = selectedProvider;
  let retryCount = 0;
  let lastError: Error | null = null;

  while (retryCount <= maxRetries) {
    try {
      switch (id) {
        case 'gemini':
          return await callGeminiAPI(message, selectedProvider);
        case 'openai':
          return await callOpenAIAPI(message, selectedProvider);
        case 'anthropic':
          return await callAnthropicAPI(message, selectedProvider);
        case 'mistral':
          return await callMistralAPI(message, selectedProvider);
        default:
          throw new Error(`Unsupported provider: ${id}`);
      }
    } catch (error) {
      console.error(`Error calling ${name} (attempt ${retryCount + 1}/${maxRetries + 1}):`, error);
      lastError = error as Error;
      retryCount++;
      
      // If we've exhausted retries, try the next provider
      if (retryCount > maxRetries) {
        console.log(`All retries failed for ${name}, trying next provider...`);
        const nextProvider = getNextProvider();
        if (nextProvider && nextProvider.id !== id) {
          return callLLM(message, nextProvider);
        }
      } else {
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, selectedProvider.retryDelay));
      }
    }
  }

  throw lastError || new Error('Failed to get response from any LLM provider');
};

// Gemini API implementation
const callGeminiAPI = async (message: string, provider: Provider): Promise<LLMResponse> => {
  const { baseUrl, apiKey, model } = provider;
  const url = `${baseUrl}/${model}:generateContent?key=${apiKey}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: message }],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Gemini API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
  
  if (!content) {
    throw new Error('No content in Gemini response');
  }

  return {
    content,
    provider: 'Google Gemini',
    model,
  };
};

// OpenAI API implementation
const callOpenAIAPI = async (message: string, provider: Provider): Promise<LLMResponse> => {
  const { baseUrl, apiKey, model } = provider;
  const url = `${baseUrl}/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OpenAI API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content in OpenAI response');
  }

  return {
    content,
    provider: 'OpenAI',
    model,
    tokens: data.usage?.total_tokens,
  };
};

// Anthropic API implementation
const callAnthropicAPI = async (message: string, provider: Provider): Promise<LLMResponse> => {
  const { baseUrl, apiKey, model } = provider;
  const url = `${baseUrl}/messages`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [
        { role: 'user', content: message }
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Anthropic API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.content?.[0]?.text;
  
  if (!content) {
    throw new Error('No content in Anthropic response');
  }

  return {
    content,
    provider: 'Anthropic',
    model,
    tokens: data.usage?.input_tokens + data.usage?.output_tokens,
  };
};

// Mistral API implementation
const callMistralAPI = async (message: string, provider: Provider): Promise<LLMResponse> => {
  const { baseUrl, apiKey, model } = provider;
  const url = `${baseUrl}/chat/completions`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'user', content: message }
      ],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Mistral API error: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  
  if (!content) {
    throw new Error('No content in Mistral response');
  }

  return {
    content,
    provider: 'Mistral',
    model,
    tokens: data.usage?.total_tokens,
  };
};

export { callLLM };
export type { LLMResponse };
