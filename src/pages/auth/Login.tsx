import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Sheet, Typography, FormControl, FormLabel, Input, Button, Box, IconButton } from "@mui/joy";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { authProvider } from '../../authprovider';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const form = event.currentTarget;
        const username = (form.elements.namedItem("username") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        console.log("Username:", username);
        console.log("Password:", password);

        authProvider.login({ username, password });
        // navigate('/'); // Redirect to home
    };

    const handleClickShowPassword = () => {
        setShowPassword(prev => !prev);
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
                        <FormLabel>Username</FormLabel>
                        <Input
                            name="username"
                            type="text" // Changed to text for better input handling
                            placeholder="username"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                            endDecorator = {
                                <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            }
                        />
                    </FormControl>

                    <Button sx={{ mt: 1 }} type="submit">Sign in</Button>
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
