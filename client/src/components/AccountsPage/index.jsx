import { Link } from 'react-router-dom';
import AccountsList from './AccountsList.jsx';

export default function AccountsPage() {
	return (
		<div className="page-wrapper page-fixed text-left">
			<Link className="btn" to="/account/add">
				Create account
			</Link>
			<AccountsList />
		</div>
	);
}
