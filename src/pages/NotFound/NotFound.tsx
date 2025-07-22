import { Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-white to-blue-50 text-center px-4">
            <h1 className="text-9xl font-extrabold text-blue-600 tracking-tight drop-shadow-md">404</h1>
            <p className="text-xl text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="mt-6">
                <Button type="primary" size="large">
                    Back to Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;