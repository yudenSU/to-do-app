import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Sheet, Typography, FormControl, FormLabel, Input, Button, Box, IconButton } from "@mui/joy";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const form = event.currentTarget;
        const username = (form.elements.namedItem("usernameOrEmail") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        try {
            const success = await login(username, password);
            if (success) {
                navigate('/'); // Redirect to the home page
            } else {
                setErrorMessage("Invalid credentials, please try again.");
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setErrorMessage("Invalid login credentials. Please try again");
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleInputChange = () => {
        setErrorMessage(null); // Reset the error message when the user starts typing
    };

    return (
        <main>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: '1rem'
            }}>
                <div>
                    <Typography level="h2" component="h1">
                        Sign in
                    </Typography>
                </div>
                <Sheet
                    component="form"
                    onSubmit={handleLogin}
                    sx={{
                        width: 320,
                        maxWidth: '90%',
                        py: 3,
                        px: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        borderRadius: 'md',
                        boxShadow: 'md',
                    }}
                    variant="outlined"
                >
                    <FormControl>
                        <FormLabel htmlFor="usernameOrEmail">Username or email address</FormLabel>
                        <Input
                            id="usernameOrEmail"
                            name="usernameOrEmail"
                            type="text"
                            placeholder="Username or email"
                            onChange={handleInputChange} // Reset error message on typing
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                            onChange={handleInputChange} // Reset error message on typing
                            endDecorator={
                                <IconButton
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={handleClickShowPassword}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            }
                        />
                    </FormControl>

                    <Button sx={{ mt: 1 }} type="submit">Sign in</Button>

                    {errorMessage && (
                        <Typography
                            color="danger"
                            sx={{ fontSize: 'sm', textAlign: 'center' }}
                            aria-live="assertive" // Ensure the error message is announced to screen readers
                        >
                            {errorMessage}
                        </Typography>
                    )}

                    <Typography
                        endDecorator={<Link to='/register'>Sign up</Link>}
                        sx={{ fontSize: 'sm', alignSelf: 'center' }}
                    >
                        Don&apos;t have an account?
                    </Typography>
                    <Link to='/forgot-password'>Forgot your password?</Link>
                </Sheet>
            </Box>
        </main>
    );
};

export default LoginPage;
