import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/atoms';
import axiosInstance from '../utils/axiosInstance';
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";

const HistoryList = () => {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const { isLoggedIn, user } = useRecoilValue(authState); // Use Recoil to get authentication state

    useEffect(() => {
        const fetchHistory = async () => {
            if (isLoggedIn && user) {
                try {
                    const response = await axiosInstance.get('/user/history');
                    setHistory(response.data);
                } catch (error) {
                    console.error('Error fetching history:', error);
                }
            } else {
                navigate("/login");
            }
        };

        fetchHistory();
    }, [isLoggedIn, user, navigate]);

    if (!isLoggedIn) {
        return <p className="text-center text-lg font-semibold text-gray-600 mt-20">Please log in to view your history.</p>;
    }

    const handleDownload = async (url, filename) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link); // Append link to the body
            link.click();
            document.body.removeChild(link); // Remove link from the body
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-8 mt-12 bg-white shadow-lg rounded-lg border border-gray-200">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Conversion History</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">Operation</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">Original Format</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">Converted Format</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">Image</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">Timestamp</th>
                            <th className="py-3 px-4 border-b border-gray-300 text-left">Action</th> {/* New column for actions */}
                        </tr>
                        </thead>
                        <tbody className="text-gray-700 text-sm">
                        {history.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="py-4 text-center text-gray-500">No history found</td>
                            </tr>
                        ) : (
                            history.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4 border-b border-gray-300">{item.operation}</td>
                                    <td className="py-3 px-4 border-b border-gray-300">{item.originalFormat}</td>
                                    <td className="py-3 px-4 border-b border-gray-300">{item.convertedFormat}</td>
                                    <td className="py-3 px-4 border-b border-gray-300">
                                        <a href={item.imageUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold">
                                            View Image
                                        </a>
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-300">{new Date(item.timestamp).toLocaleString()}</td>
                                    <td className="py-3 px-4 border-b border-gray-300">
                                        <button 
                                            onClick={() => handleDownload(item.imageUrl, `image_${item._id}`)}
                                            className="text-red-600 hover:text-red-800 font-semibold"
                                        >
                                            Download
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default HistoryList;
