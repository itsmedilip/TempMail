
export interface Domain {
  id: string;
  domain: string;
  isActive: boolean;
  isPrivate: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Account {
  id: string;
  address: string;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TokenData {
  token: string;
  id: string;
}

export interface Message {
  id: string;
  from: {
    address: string;
    name: string;
  };
  to: {
    address: string;
    name: string;
  }[];
  subject: string;
  intro: string;
  seen: boolean;
  createdAt: string;
}

export interface MessageDetails extends Message {
  text: string;
  html: string[];
}

export interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface HydraCollection<T> {
  'hydra:member': T[];
  'hydra:totalItems': number;
}
