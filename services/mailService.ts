import { API_BASE_URL, FETCH_TIMEOUT } from '../constants';
import { Domain, Account, TokenData, Message, MessageDetails, HydraCollection } from '../types';

const fetchWithTimeout = async <T,>(resource: string, options: RequestInit = {}, retries = 5, initialBackoff = 3000): Promise<T> => {
  let backoff = initialBackoff;
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.warn(`Request to ${resource} timed out after ${FETCH_TIMEOUT}ms.`);
      controller.abort();
    }, FETCH_TIMEOUT);

    try {
      const response = await fetch(resource, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.status === 429 && i < retries - 1) {
        const jitter = Math.random() * 1000;
        const waitTime = backoff + jitter;
        console.warn(`Rate limited (429). Retrying in ${waitTime.toFixed(0)}ms... (Attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, waitTime));
        backoff *= 2; // Exponential backoff
        continue;
      }

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Handle successful but empty responses (e.g., 204 No Content)
      if (response.status === 204) {
        return null as T;
      }

      return await response.json();

    } catch (error: any) {
      clearTimeout(timeoutId);
      // Check for timeout/network error and if we still have retries left
      if ((error.name === 'AbortError' || error.message.includes('Failed to fetch')) && i < retries - 1) {
        console.warn(`Request failed (${error.message}). Retrying in ${backoff}ms... (Attempt ${i + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2;
        continue;
      }
      
      // On the last retry or for a non-retryable error, re-throw it.
      throw error;
    }
  }
  
  // This line should be unreachable if the loop logic is correct, but it's a safeguard.
  throw new Error('API request failed after multiple retries.');
};


export const getDomain = async (): Promise<Domain | null> => {
  try {
    const response = await fetchWithTimeout<HydraCollection<Domain>>(`${API_BASE_URL}/domains`);
    const domains = response['hydra:member'];
    return domains.length > 0 ? domains[0] : null;
  } catch (error) {
    console.error("Error fetching domains:", error);
    throw error;
  }
};

export const createAccount = async (address: string, password: string): Promise<Account> => {
  try {
    return await fetchWithTimeout<Account>(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, password })
    });
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};

export const getToken = async (address: string, password: string): Promise<TokenData> => {
  try {
    return await fetchWithTimeout<TokenData>(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: address, password })
    });
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

export const getMessages = async (token: string): Promise<Message[]> => {
  try {
    const response = await fetchWithTimeout<HydraCollection<Message>>(`${API_BASE_URL}/messages`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const messages = response['hydra:member'];
    return messages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const getMessage = async (id: string, token: string): Promise<MessageDetails> => {
  try {
    return await fetchWithTimeout<MessageDetails>(`${API_BASE_URL}/messages/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Error fetching message details:", error);
    throw error;
  }
};

export const deleteAccount = async (id: string, token: string): Promise<void> => {
  try {
     await fetchWithTimeout<void>(`${API_BASE_URL}/accounts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    // Don't throw, allow user to continue
  }
};