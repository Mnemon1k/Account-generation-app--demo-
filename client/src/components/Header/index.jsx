import './Header.scss';
import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<header className="App-header">
			<div className="menu">
				<div className="menu-item">
					<Link to="/proxy">Proxy</Link>
				</div>
				<div className="menu-item">
					<Link to="/email">Emails</Link>
				</div>
				<div className="menu-item">
					<Link to="/accounts">Accounts</Link>
				</div>
				<div className="menu-item ">
					<Link className="btn" to="/">
						Create account
					</Link>
				</div>
			</div>
		</header>
	);
}
