import axios from 'axios';
import { API_URL } from '../constants/urls';

export const useLogout = () => {
  const logout = async () => {
    await axios.post(
      `${API_URL}/auth/logout`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
  };

  return { logout };
};
