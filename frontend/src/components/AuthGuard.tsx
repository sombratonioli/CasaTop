'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const isPublicRoute = pathname === '/login' || pathname === '/registro';

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

    if (!isPublicRoute && !token) {
      router.push('/login');
    }
    
    setIsChecking(false);
  }, [pathname, router, isPublicRoute]);

  if (isChecking) {
    return null;
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 mt-16 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </>
  );
}
