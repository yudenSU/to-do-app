import * as Layout from '../components/layout';
import { Typography } from '@mui/joy';

export default function HelpPage() {
	return (
		<Layout.StandardLayout>
			<Typography level="h1" mb={2}>Need Help?</Typography>
			<Typography level="h4">To add to-do items:</Typography>
			<ol>
				<li>Go to the to-do page.</li>
				<li>Click "Add task".</li>
				<li>Enter the task in the input box.</li>
			</ol>
			<Typography level="h4">To delete to-do items:</Typography>
			<ol>
				<li>Go to the to-do page.</li>
				<li>Find the task in the list.</li>
				<li>Click the "X" icon.</li>
			</ol>

			<Typography level="h4">To edit to-do items:</Typography>
			<ol>
				<li>Go to the to-do page.</li>
				<li>Find the task in the list.</li>
				<li>Click the task to edit its content.</li>
			</ol>

			<Typography level="h4">To check-off to-do items:</Typography>
			<ol>
				<li>Go to the to-do page.</li>
				<li>Find the task in the list.</li>
				<li>Click on the checkbox to the left of the task.</li>
			</ol>
		</Layout.StandardLayout>
	);
}
