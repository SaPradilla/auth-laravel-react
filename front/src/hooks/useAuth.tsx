import { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const validationsFieldsLogin = {
        email: {
            required: "Email is required",
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address"
            }
        },
        password: {
            required: "Password is required"
        }
    };
    const authenticate = async (data: any) => {
        try {
            const response = await login(data);
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem("token", response.data.access_token);
                navigate("/");
            }
        } catch (error) {
            setError(true);
            console.error(error);
            setTimeout(() => {
                setError(false);
            }, 5000); // El error desaparecerá después de 5 segundos
        }
    };

    return {
        error,
        authenticate,
        validationsFieldsLogin
    };
}

export default useAuth;
