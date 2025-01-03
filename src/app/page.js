'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const tokenString = localStorage.getItem('attendencetoken');
      let token;

      try {
        token = tokenString ? JSON.parse(tokenString) : null;
      } catch (error) {
        console.error('Invalid JSON in attendencetoken:', error);
        localStorage.removeItem('attendencetoken');
        router.push('/login', { scroll: false });
        return;
      }

      if (token) {
        try {
          const response = await fetch(
            `http://localhost:4000/teachers/${token.id}`,
            { cache: 'no-store' }
          );
          const result = await response.json();

          if (
            result.fullname === token.name &&
            result.institute === token.institute &&
            result.department === token.department
          ) {
            router.push(`/${result.id}/classes`, { scroll: false });
          } else {
            localStorage.removeItem('attendencetoken');
            localStorage.setItem(
              'toast',
              JSON.stringify({
                type: 'warning',
                message: 'You must log in first',
              })
            );
            router.push('/login', { scroll: false });
          }
        } catch (error) {
          console.error('Error validating token:', error);
          localStorage.removeItem('attendencetoken');
          router.push('/login', { scroll: false });
        }
      } else {
        router.push('/login', { scroll: false });
      }
    };

    checkAuthStatus();
  }, [router]);

  return null; // No need to render anything on the home page as it redirects
};

export default Home;
