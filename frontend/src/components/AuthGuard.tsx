'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  const isPublicRoute = pathname === '/login' || pathname === '/registro';

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access') : null;

    if (!isPublicRoute && !token) {
      router.push('/login');
    } else {
      setAuthorized(true);
    }
  }, [pathname, router, isPublicRoute]);

  if (!authorized) {
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
