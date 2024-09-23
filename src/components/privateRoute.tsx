import { useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from 'react';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken);
    setIsLoading(false);

    if (!storedToken) {
      router.push('/');
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return token ? <>{children}</> : null;
};

export default PrivateRoute;
