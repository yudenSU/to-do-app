import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import { Box, IconButton, Typography } from "@mui/joy";

interface PaginationProps {
    current: number;
    total: number;
    onPrev: () => void; // Callback for previous button
    onNext: () => void; // Callback for next button
}

export default function Pagination({ current, total, onPrev, onNext }: PaginationProps) {
    return (
        <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <IconButton
                title="previous"
                onClick={onPrev}
                disabled={current === 1}
            >
                <ArrowBackIosNew />
            </IconButton>
            <Typography level="body-sm">
                Page {current} of {total}
            </Typography>
            <IconButton
                title="next"
                onClick={onNext}
                disabled={current === total}
            >
                <ArrowForwardIos />
            </IconButton>
        </Box>
    );
}
