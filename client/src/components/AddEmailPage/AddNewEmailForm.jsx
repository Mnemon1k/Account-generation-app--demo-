import axios from 'axios';
import { useState } from 'react';

export default function AddNewEmailForm() {
	const [textareaVal, setTextareaVal] = useState([]);
	const [notification, setNotification] = useState([]);

	const saveProxy = async (payload) => {
		axios
			.post(process.env.REACT_APP_API_URL + 'email', payload)
			.then((result) => {
				console.log(result.data);
				if (result.data.statusCode === 200) {
					setNotification('Saved');
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.data.message) {
					setNotification(error.response.data.message);
				}
			});
	};
	function validateEmail(email) {
		var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (textareaVal.length) {
			let emailsArray = textareaVal.trim().split(/[\s,]+/);

			if (emailsArray[0].length) {
				var emailsArrayFilter = emailsArray.map((email) => {
					if (validateEmail(email)) {
						return { name: email };
					}
				});

				emailsArrayFilter = emailsArrayFilter.filter((email) => {
					return email;
				});

				if (emailsArrayFilter.length) {
					await saveProxy(emailsArrayFilter);
				} else {
					setNotification('Invalid format');
				}
			}
		}
	};

	return (
		<>
			<form className="form" onSubmit={handleSubmit}>
				<textarea
					className="textarea"
					type="text"
					placeholder="Example: test@mail.com,test@mail.com,test@mail.com"
					value={textareaVal}
					onChange={(e) => setTextareaVal(e.target.value)}
				/>
				{notification && notification.length ? <div className="form-notification">{notification}</div> : ''}
				<button type="submit" className="btn">
					Save to database
				</button>
			</form>
		</>
	);
}
