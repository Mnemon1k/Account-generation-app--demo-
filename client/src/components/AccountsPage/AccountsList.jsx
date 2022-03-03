import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function AccountsList() {
	const [accountsData, setAccountData] = useState([]);
	const monthNames = [
		'January',
		'Feb',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const getAccouns = async () => {
		const { data } = await axios.get(process.env.REACT_APP_API_URL + 'accounts');
		if (data.statusCode === 200) {
			setAccountData(data.payload);
		}
	};

	const removeAccount = async (event) => {
		const { data } = await axios.delete(process.env.REACT_APP_API_URL + 'accounts', {
			id: event.target.dataset.id,
		});
		if (data.statusCode === 200) {
			getAccouns();
		}
	};

	const handleStatusChange = async (event) => {
		let id = event.target.parentNode.dataset.id;
		let status = event.target.value;
		let payload = { id, status };

		const { data } = await axios.put(process.env.REACT_APP_API_URL + 'accounts', payload);

		if (data.statusCode === 200) {
			getAccouns();
		}
	};

	useEffect(() => {
		getAccouns();
	}, []);

	return (
		<div className="offset-t-30">
			<MaterialTable
				options={{
					sorting: true,
					pageSize: 10,
					pageSizeOptions: [10, 20, 50, 100, 500],
					rowStyle: {
						padding: '2px ​22px',
						fontSize: '14px',
						letterSpacing: '1',
					},
				}}
				data={accountsData}
				title="Accounts list"
				columns={[
					{
						title: 'Full name',
						render: (rowData) => {
							return (
								<span stype="text-transform: capitalize;">
									{rowData.name.toLowerCase()} {rowData.surname.toLowerCase()}
								</span>
							);
						},
					},
					{
						title: 'Email',
						render: (rowData) => (rowData.email ? rowData.email.name : ''),
					},
					{
						title: 'Proxy',
						render: (rowData) => (rowData.proxy ? rowData.proxy.ip : ''),
					},
					{
						title: 'Region',
						field: 'region',
					},
					{
						title: 'Status',
						render: (rowData) => (
							<Box sx={{ minWidth: 120 }}>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<NativeSelect
										data-id={rowData._id}
										value={rowData.status}
										label="status"
										onChange={handleStatusChange}>
										<option value="new">New</option>
										<option value="photo_verif">Photo verification</option>
										<option value="support_verif">Persenal review</option>
										<option value="verif">Verif</option>
										<option value="ban">Ban</option>
									</NativeSelect>
								</FormControl>
							</Box>
						),
					},
					{
						title: 'Creation date',
						defaultSort: 'desc',
						customSort: (a, b) => {
							let first = new Date(a.created_at);
							let second = new Date(b.created_at);

							return first - second;
						},
						render: (rowData) => {
							var date = new Date(rowData.created_at);

							return `${date.getDate()} ${
								monthNames[date.getMonth()]
							} - ${date.getHours()}:${date.getMinutes()}`;
						},
					},
					{
						title: '',
						field: 'controls',
						render: (rowData) => (
							<Button
								data-id={rowData['_id']}
								color="error"
								onClick={removeAccount}
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
