import { Link, useNavigate } from "react-router-dom";
import { Box, Typography, Sheet, FormControl, FormLabel, Input, Button } from "@mui/joy";

const RegisterPage = () => {
    const navigate = useNavigate();

    const handleRegister = () => {
        // Redirect to dashboard after login
        navigate('/dashboard');
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
                        Sign up
                    </Typography>
                </div>
                <Sheet
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
                            // html input attribute
                            name="username"
                            type="username"
                            placeholder="username"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                            name="password"
                            type="password"
                            placeholder="password"
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Confirm Password</FormLabel>
                        <Input
                            name="confirm password"
                            type="confirm password"
                            placeholder="confirm password"
                        />
                    </FormControl>
                    <Button sx={{ mt: 1 }} onClick={handleRegister}>Sign up</Button>
                    <Typography
                        endDecorator={<Link to='/login'>Sign in</Link>}
                        sx={{ fontSize: 'sm', alignSelf: 'center' }}
                    >
                        already have an account?
                    </Typography>
                </Sheet>
            </Box>
        </main>
    );
};


export default RegisterPage