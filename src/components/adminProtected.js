'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRouteProtect({ children }) {
  const router = useRouter();

  useEffect(() => {
   
    const adminInfo = localStorage.getItem('adminInfo');
    if (!adminInfo) {
     
      router.replace('/pages/admin-login'); 
    }
  }, [router]);

  
  return children;
}