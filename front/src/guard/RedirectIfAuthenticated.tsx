import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const RedirectIfAuthenticated = ({ children }: { children: JSX.Element }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    if (isAuthenticated === null) {
        return null; // O un spinner de carga si prefieres
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default RedirectIfAuthenticated;