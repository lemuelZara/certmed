import React, { createContext, useCallback, useContext, useState } from 'react';

import api from '../services/api';

interface TypeUser {
  id: number;
  name: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  type: TypeUser;
}

interface AuthState {
  token: string;
  user: User;
}

interface SigInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SigInCredentials): Promise<User>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@CertMED:token');
    const user = localStorage.getItem('@CertMED:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }): Promise<User> => {
    const response = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@CertMED:token', token);
    localStorage.setItem('@CertMED:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });

    return user;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CertMED:token');
    localStorage.removeItem('@CertMED:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider');
  }

  return context;
}
