import axios from 'axios';
import { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

export default function ProxyList() {
	const [proxyData, setProxyData] = useState([]);

	const getProxy = async () => {
		const { data } = await axios.get(process.env.REACT_APP_API_URL + 'proxy');
		if (data.statusCode === 200) {
			setProxyData(data.payload);
		}
	};

	const removeProxy = async (event) => {
		const { data } = await axios.delete(process.env.REACT_APP_API_URL + 'proxy', {
			ip: event.target.dataset.ip,
		});
		if (data.statusCode === 200) {
			getProxy();
		}
	};

	useEffect(() => {
		getProxy();
	}, []);

	const handleStatusChange = async (event) => {
		let ip = event.target.parentNode.dataset.ip;
		let newStatus = event.target.value;
		let payload = { ip, free: newStatus === 'true' };

		const { data } = await axios.put(process.env.REACT_APP_API_URL + 'proxy', payload);

		if (data.statusCode === 200) {
			getProxy();
		}
	};

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
				data={proxyData}
				title="Список proxy"
				columns={[
					{
						title: 'URL',
						field: 'url',
						render: (rowData) => rowData.ip + ':' + rowData.port,
					},
					{
						title: 'Login',
						field: 'username',
					},
					{
						title: 'Password',
						field: 'password',
					},
					{
						title: 'Connection type',
						field: 'connection_type',
					},
					{
						title: 'Status',
						field: 'free',
						defaultSort: 'desc',
						render: (rowData) => (
							<Box sx={{ minWidth: 120 }}>
								<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
									<NativeSelect
										data-ip={rowData.ip}
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
								data-ip={rowData.ip}
								color="error"
								onClick={removeProxy}
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
