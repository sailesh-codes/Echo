'use server'

/**
 * Server Action: callAiApi
 * Securely calls Google Gemini API
 * Keeps API key on server-side only, never exposed to client
 */
export async function callAiApi(message: string) {
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  if (!apiKey) {
    throw new Error('Gemini API key not configured')
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: message,
              },
            ],
          },
        ],
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      throw new Error('No response generated from Gemini')
    }

    return text
  } catch (error) {
    console.error('Gemini API call failed:', error)
    throw error
  }
}
