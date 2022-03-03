import AddNewEmailForm from './AddNewEmailForm.jsx';

export default function EmailPage() {
	return (
		<div className="page-wrapper page-fixed-sm text-left">
			<h2>Add email</h2>
			<p>Emails must be separated by comma or space</p>
			<AddNewEmailForm />
		</div>
	);
}
