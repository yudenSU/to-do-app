import * as Layout from '../components/layout';
import { Typography } from '@mui/joy';
import Todo from '../components/todo/Todo';

export default function HomePage() {
	return (
		<Layout.StandardLayout>
			<Typography level='h1'>To do:</Typography>
			<Todo />
		</Layout.StandardLayout>
	);
}