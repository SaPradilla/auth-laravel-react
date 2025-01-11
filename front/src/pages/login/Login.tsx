import { useForm } from "react-hook-form";
import { TextField, IconButton, InputAdornment,FormHelperText  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from '@mui/lab';
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } = useForm();
    const { error, authenticate,validationsFieldsLogin } = useAuth();

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const onSubmit = async (data: any) => {
        await authenticate(data);
    };


    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-blue-200 to-cyan-200">
            
            <form className="flex flex-col gap-4 shadow-md p-4 rounded-md bg-white" onSubmit={handleSubmit(onSubmit)}>
                <h2 className="text-2xl">Login</h2>
                {
                    error &&   <FormHelperText error={error}> Invalid credentials </FormHelperText>
                }
              
                <TextField
                    label="Email"
                    variant="outlined"
                    {...register("email", validationsFieldsLogin.email)}
                    error={!!errors.email || error}
                    helperText={errors.email ? String(errors.email.message) : ""}
                />
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    variant="outlined"
                    {...register("password", validationsFieldsLogin.password)}
                    error={!!errors.password || error}
                    helperText={errors.password ? String(errors.password.message) : ""}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <LoadingButton
                    disabled={!isValid}
                    loading={isSubmitting}
                    loadingIndicator="Loading..."
                    type="submit" variant="contained" color="primary" fullWidth>
                    Login
                </LoadingButton>
            </form>
        </div>
    );
}

export default Login
