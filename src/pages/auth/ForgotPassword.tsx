import { Link } from "react-router-dom";
import { Box, Typography, Sheet, FormControl, FormLabel, Input, Button } from "@mui/joy";

const ForgotPasswordPage = () => {

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
                    <Typography level="body-md">Forgot your password</Typography>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                            // html input attribute
                            name="username"
                            type="username"
                            placeholder="username"
                        />
                    </FormControl>
                    <Button sx={{ mt: 1 }}>Request reset</Button>
                    <Link to='/login'>Back to login</Link>
                </Sheet>
            </Box>
        </main>
    );
};

export default ForgotPasswordPage