import { Link } from 'react-router-dom';
import ProxyList from './ProxyList.jsx';

export default function ProxyPage() {
	return (
		<div className="page-wrapper page-fixed text-left">
			<Link className="btn" to="/proxy/add">
				Add proxy
			</Link>
			<ProxyList />
		</div>
	);
}
