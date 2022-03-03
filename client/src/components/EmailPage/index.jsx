import { Link } from 'react-router-dom';
import EmailList from './EmailList.jsx';

export default function EmailPage() {
	return (
		<div className="page-wrapper page-fixed-sm text-left">
			<Link className="btn" to="/email/add">
				Add email
			</Link>
			<EmailList />
		</div>
	);
}
