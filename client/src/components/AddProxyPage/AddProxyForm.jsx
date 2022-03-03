import axios from 'axios';
import { useState } from 'react';

export default function AddProxyForm() {
	const [textareaVal, setTextareaVal] = useState([]);
	const [notification, setNotification] = useState([]);

	const saveProxy = async (payload) => {
		axios
			.post(process.env.REACT_APP_API_URL + 'proxy', payload)
			.then((result) => {
				console.log(result.data);
				if (result.data.statusCode === 200) {
					setNotification('Data saved');
				}
			})
			.catch((error) => {
				console.log(error.response.data);
				if (error.response.data.message) {
					setNotification(error.response.data.message);
				}
			});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			if (textareaVal.length) {
				console.log(textareaVal);
				console.log(JSON.parse(textareaVal));
				let { proxies, credentials, port } = JSON.parse(textareaVal);

				let payload = [];
				proxies.forEach((ip) => {
					payload.push({
						ip,
						port,
						connection_type: 'Socks 5 proxy',
						username: credentials.split(':')[0],
						password: credentials.split(':')[1],
					});
				});

				if (payload.length) {
					await saveProxy(payload);
				} else {
					setNotification('Data format is not valid');
				}
			}
		} catch (error) {
			setNotification('Data format is not valid');
			console.log(error);
		}
	};

	const inputExample = `{
	"credentials": "login:password",
	"port": 8000,
	"proxies": [
		"",
		""
	]
}`;

	return (
		<>
			<form className="form" onSubmit={handleSubmit}>
				<textarea
					className="textarea"
					type="text"
					placeholder='{
  "credentials": "login:pass",
  "port": xxxx,
  "proxies": [
    "xxx.xx.xx.xxx",
  ]
}'
					value={textareaVal}
					onChange={(e) => setTextareaVal(e.target.value)}
				/>
				{notification && notification.length ? <div className="form-notification">{notification}</div> : ''}
				<button type="submit" className="btn">
					Save in database
				</button>

				<code>
					<pre>{inputExample}</pre>
				</code>
			</form>
		</>
	);
}
