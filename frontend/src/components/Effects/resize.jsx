import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';

function Resize() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [copyMessage, setCopyMessage] = useState('');

    // Define allowed formats for resizing
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

    const onResize = async () => {
        if (!selectedFile || !width || !height) {
            setErrorMessage('Please provide width and height.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('width', width);
        formData.append('height', height);

        try {
            const response = await axiosInstance.post('images/resize', formData, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const blob = new Blob([response.data], { type: selectedFile.type });
            const url = URL.createObjectURL(blob);
            setResizedImage(url);
            setDownloadLink(url);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error resizing image:', error.message);
            setErrorMessage('Error resizing image. Please try again.');
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

    return (
        <div>
            <Navbar />
        <div
            className="max-w-4xl mx-auto border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 mt-10 bg-white"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Resize Image</h2>
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
                <input
                    type="number"
                    placeholder="Width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="border border-gray-300 rounded-lg p-4 mr-4 w-1/3 text-lg"
                />
                <input
                    type="number"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="border border-gray-300 rounded-lg p-4 w-1/3 text-lg"
                />
            </div>
            <button onClick={onResize} className="bg-green-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-green-700 transition-colors duration-300 mb-8">
                Resize
            </button>
            {resizedImage && (
                <div className="mt-8">
                    <img src={resizedImage} alt="Resized" className="max-w-full max-h-96 border border-gray-300 rounded-lg object-cover" />
                </div>
            )}
            {downloadLink && (
                <div className="flex flex-col items-center mt-8">
                    <div className="flex items-center mb-4 w-full">
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
                        download={`resized.${selectedFile?.name.split('.').pop()}`}
                        className="bg-red-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-red-700 transition-colors duration-300 mt-4"
                    >
                        Download Resized Image
                    </a>
                    <QRCode value={downloadLink} size={128} className="mt-8" />
                </div>
            )}
        </div>
        </div>
    );
}

export default Resize;
