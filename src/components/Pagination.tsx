import ArrowBackIosNew from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";

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
				aria-label="Go to previous content"
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
				aria-label="Go to next content"
			>
				<ArrowForwardIos />
			</IconButton>
		</Box>
	);
}
