import { JSX, useEffect } from 'react';
import { useGetMe } from '../hooks';
import { excludedRoutes } from '../constants/excluded-routes';
import { authenticatedVar } from '../constants/authenticated';

interface GuardProps {
  children: JSX.Element;
}

export const Guard = ({ children }: GuardProps) => {
  const { data: user } = useGetMe();

  useEffect(() => {
    if (user) {
      console.log('setting authenticated true...');

      authenticatedVar(true);
    }
  }, [user]);

  return (
    <>
      {excludedRoutes.includes(window.location.pathname)
        ? children
        : user && children}
    </>
  );
};
