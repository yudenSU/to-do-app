import { Link } from "react-router-dom";
import { Box, Typography, Sheet, FormControl, FormLabel, Input, Button } from "@mui/joy";
import { useState } from "react";

const ForgotPasswordPage = () => {
    const [resetRequested, setResetRequested] = useState<boolean>(false)
    const [emailAccount, setEmailAccount] = useState<string>("")

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        setEmailAccount(email);
        setResetRequested(true);
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
                {
                    resetRequested ?
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
                            <Typography level="h4">Password reset requested</Typography>
                            <Typography level="body-md">A reset email has been sent to your email account: {emailAccount}</Typography>
                            <Link to='/login'>Back to login</Link>
                        </Sheet>
                        :
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
                            <Typography level="h4">Forgot your password</Typography>
                            <Typography level="body-md">Please enter the email associated with your account.</Typography>
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        // html input attribute
                                        name="email"
                                        type="email"
                                        placeholder="Please enter your email"
                                        required
                                    />
                                </FormControl>
                                <Button fullWidth sx={{ mt: 1 }} type="submit">Reset</Button>
                            </form>
                            <Link to='/login'>Back to login</Link>
                        </Sheet>
                }
            </Box>
        </main>
    );
};

export default ForgotPasswordPage