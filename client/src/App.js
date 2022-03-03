import './App.scss';
import AddAccountPage from './components/AddAccountPage';
import EmailPage from './components/EmailPage';
import AddEmailPage from './components/AddEmailPage';
import AddProxyPage from './components/AddProxyPage';
import Header from './components/Header';
import { Routes, Route } from 'react-router-dom';
import ProxyPage from './components/ProxyPage';
import AccountsPage from './components/AccountsPage';

function App() {
	return (
		<div className="App">
			<Header />
			<div className="App-body">
				<Routes>
					<Route path="/" element={<AddAccountPage />} />
					<Route path="email" element={<EmailPage />} />
					<Route path="proxy" element={<ProxyPage />} />
					<Route path="accounts" element={<AccountsPage />} />
					<Route path="account/add" element={<AddAccountPage />} />
					<Route path="email/add" element={<AddEmailPage />} />
					<Route path="proxy/add" element={<AddProxyPage />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
