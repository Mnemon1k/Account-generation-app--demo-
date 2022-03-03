import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function EmailList() {
	const [emailsData, setEmailsData] = useState([]);

	const getEmails = async () => {
		const { data } = await axios.get(process.env.REACT_APP_API_URL + 'email');
		if (data.statusCode === 200) {
			setEmailsData(data.payload);
		}
	};

	const removeEmail = async (event) => {
		const { data } = await axios.delete(process.env.REACT_APP_API_URL + 'email', {
			name: event.target.dataset.email,
		});
		if (data.statusCode === 200) {
			getEmails();
		}
	};

	useEffect(() => {
		getEmails();
	}, []);

	const handleStatusChange = async (event) => {
		let email = event.target.parentNode.dataset.email;
		let newStatus = event.target.value;
		let payload = { name: email, free: newStatus === 'true' };

		const { data } = await axios.put(process.env.REACT_APP_API_URL + 'email', payload);

		if (data.statusCode === 200) {
			getEmails();
		}
	};

	console.log('data: ', emailsData);
	return (
		<div className="offset-t-30">
			<MaterialTable
				options={{
					sorting: true,
					pageSize: 50,
					pageSizeOptions: [10, 20, 50, 100, 500],
					rowStyle: {
						padding: '12px 15px',
						fontSize: '14px',
						letterSpacing: '1',
					},
				}}
				data={emailsData}
				title="Emails list"
				columns={[
					{ title: 'Name', field: 'name' },
					{
						title: 'Status',
						field: 'free',
						defaultSort: 'desc',
						render: (rowData) => (
							<Box sx={{ minWidth: 120 }}>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<NativeSelect
										data-email={rowData.name}
										value={rowData.free}
										label="status"
										onChange={handleStatusChange}>
										<option value={true}>Free</option>
										<option value={false}>Reserved</option>
									</NativeSelect>
								</FormControl>
							</Box>
						),
					},
					{
						title: '',
						field: 'controls',
						render: (rowData) => (
							<Button
								data-email={rowData.name}
								color="error"
								size="small"
								onClick={removeEmail}
								variant="outlined"
								startIcon={<DeleteIcon />}>
								Delete
							</Button>
						),
					},
				]}
			/>
		</div>
	);
}
