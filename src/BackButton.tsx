import { Link } from "react-router-dom";

const BackButton: React.FC = () => {
	return (
		<Link
			to="/"
			className="text-blue-500 hover:underline my-4 inline-block"
		>
			Back to Products
		</Link>
	);
};

export default BackButton;
