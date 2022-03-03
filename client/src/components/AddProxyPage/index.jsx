import AddProxyForm from './AddProxyForm.jsx';

export default function ProxyPage() {
	return (
		<div className="page-wrapper page-fixed-sm text-left">
			<h2>Add proxy</h2>
			<p>
				Pass data in json format
				{/* Proxy должы быть разделены символом <b>;</b> */}
			</p>
			<AddProxyForm />
		</div>
	);
}
