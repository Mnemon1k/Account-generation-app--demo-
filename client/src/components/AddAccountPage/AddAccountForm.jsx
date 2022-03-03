import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

export default function AddAccountPage() {
	const { register, handleSubmit } = useForm();
	const [notification, setNotification] = useState([]);

	const sunmitHandler = (payload) => {
		axios
			.post(process.env.REACT_APP_API_URL + 'accounts', payload)
			.then(({ data }) => {
				console.log(data);
				if (data.statusCode === 200) {
					setNotification(`Success
${data.payload.verifLink}
${data.payload.accountFromDb.region}
${data.payload.accountFromDb.email.name}
${data.payload.accountFromDb.proxy.ip}`);
				}
			})
			.catch((error) => {
				if (error.response.data.message) {
					setNotification(error.response.data.message);
				}
			});
	};

	return (
		<form onSubmit={handleSubmit(sunmitHandler)} className="form">
			<input {...register('name', { required: true })} type="text" autoComplete="no" placeholder="Name" />
			<input
				{...register('surname', { required: true })}
				type="text"
				autoComplete="no"
				placeholder="Surname"
			/>
			<input
				{...register('birthday', { required: true })}
				type="text"
				autoComplete="no"
				placeholder="Birthday"
			/>
			<span>In format: 21-08-1996</span>
			<input {...register('country')} type="text" hidden value="ua" />

			<input className="btn" type="submit" value="Generate verification link" />

			{notification && notification.length ? (
				<div className="form-notification">
					<pre>{notification}</pre>
				</div>
			) : (
				''
			)}
		</form>
	);
}
