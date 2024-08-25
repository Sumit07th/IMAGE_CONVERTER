import React, { useState, useCallback, useMemo } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import Navbar from '../Navbar';
import QRCode from 'qrcode.react';

function Rotate() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [rotatedImage, setRotatedImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [angle, setAngle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [copyMessage, setCopyMessage] = useState('');

    // Define allowed formats for rotation
    const allowedFormats = useMemo(() => ['png', 'gif', 'jpg', 'jpeg'], []);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                setSelectedFile(file);
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Invalid image format. Only PNG, JPG, and other allowed formats are allowed.');
                setSelectedFile(null);
            }
        }
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                setSelectedFile(file);
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Invalid image format. Only PNG, JPG, and other allowed formats are allowed.');
                setSelectedFile(null);
            }
        }
    }, [allowedFormats]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onRotate = async () => {
        if (!selectedFile) {
            setErrorMessage('Please select an image file.');
            return;
        }

        if (!angle) {
            setErrorMessage('Please enter a rotation angle.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('angle', angle);

        try {
            const token = localStorage.getItem('token');
            const response = await axiosInstance.post('images/rotate', formData, {
                responseType: 'blob',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                },
            });

            const imageUrl = URL.createObjectURL(response.data);
            setRotatedImage(imageUrl);
            setDownloadLink(imageUrl);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error rotating image:', error.message);
            setErrorMessage('Error rotating image. Please try again.');
        }
    };

    const copyToClipboard = () => {
        if (downloadLink) {
            navigator.clipboard.writeText(downloadLink).then(() => {
                setCopyMessage('URL copied to clipboard!');
                setTimeout(() => setCopyMessage(''), 3000);
            });
        }
    };

    const onReset = useCallback(() => {
        setSelectedFile(null);
        setRotatedImage(null);
        setDownloadLink('');
        setAngle('');
        setErrorMessage('');
    }, []);

    return (
        <div>
            <Navbar />
            <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="max-w-4xl mx-auto border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 mt-10 bg-white"
            >
                <h2 className="text-4xl font-bold mb-8 text-gray-800">Rotate Image</h2>
                <input
                    type="file"
                    onChange={onFileChange}
                    className="hidden"
                    id="fileInput"
                />
                <label htmlFor="fileInput" className="block mb-8 p-4 bg-blue-500 text-white rounded-lg text-2xl cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                    {selectedFile ? selectedFile.name : 'Drag and drop a file here, or click to select'}
                </label>
                {errorMessage && <p className="text-red-500 text-xl mt-4">{errorMessage}</p>}
                <div className="mb-8">
                    <label htmlFor="angleInput" className="block text-lg font-semibold mb-2">
                        Enter Rotation Angle (in degrees)
                    </label>
                    <input
                        type="number"
                        id="angleInput"
                        value={angle}
                        onChange={(e) => setAngle(e.target.value)}
                        className="border border-gray-300 rounded-lg p-4 w-full text-lg"
                    />
                </div>
                <button onClick={onRotate} className="bg-green-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-green-700 transition-colors duration-300 mr-4">
                    Rotate
                </button>
                <button onClick={onReset} className="bg-gray-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-gray-700 transition-colors duration-300">
                    Reset
                </button>
                {rotatedImage && (
                    <div className="mt-8">
                        <h3 className="text-2xl font-semibold mb-4">Rotated Image</h3>
                        <img src={rotatedImage} alt="Rotated" className="max-w-full max-h-96 border border-gray-300 rounded-lg object-cover" />
                        <div className="mt-4">
                            <div className="flex items-center mb-4">
                                <input
                                    type="text"
                                    value={downloadLink}
                                    readOnly
                                    className="border border-gray-300 rounded-lg p-4 mr-4 w-full text-lg bg-gray-100"
                                />
                                <button onClick={copyToClipboard} className="bg-blue-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-blue-700 transition-colors duration-300">
                                    Copy URL
                                </button>
                            </div>
                            {copyMessage && <p className="text-green-500 text-xl">{copyMessage}</p>}
                            <a
                                href={downloadLink}
                                download="rotated_image"
                                className="bg-red-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-red-700 transition-colors duration-300 mt-4 inline-block"
                            >
                                Download Rotated Image
                            </a>
                            <div className="mt-8 flex justify-center">
                                <QRCode value={downloadLink} size={128} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Rotate;
