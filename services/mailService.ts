
import { API_BASE_URL, FETCH_TIMEOUT } from '../constants';
import { Domain, Account, TokenData, Message, MessageDetails, HydraCollection } from '../types';

const fetchWithTimeout = async <T,>(resource: string, options: RequestInit = {}): Promise<T> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`API Error: ${response.status} ${response.statusText}`, errorBody);
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
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
      body: JSON.stringify({ address, password })
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
     await fetch(`${API_BASE_URL}/accounts/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    // Don't throw, allow user to continue
  }
};
