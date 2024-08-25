import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';

function Tint() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [tintedImage, setTintedImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [tintAmount, setTintAmount] = useState(50);
    const [tintColor, setTintColor] = useState('#ff0000');
    const [errorMessage, setErrorMessage] = useState('');

    // Define allowed formats for tinting
    const allowedFormats = useMemo(() => ['png', 'gif', 'jpg', 'jpeg'], []);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                setSelectedFile(file);
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Invalid image format. Only PNG, GIF, JPG, and JPEG are allowed.');
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
                setErrorMessage('Invalid image format. Only PNG, GIF, JPG, and JPEG are allowed.');
                setSelectedFile(null);
            }
        }
    }, [allowedFormats]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onTint = async () => {
        if (!selectedFile) {
            setErrorMessage('Please select an image file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('tintAmount', tintAmount);
        formData.append('tintColor', tintColor);

        try {
            const response = await axiosInstance.post('images/tint', formData, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const blob = new Blob([response.data], { type: selectedFile.type });
            const url = URL.createObjectURL(blob);
            setTintedImage(url);
            setDownloadLink(url);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error tinting image:', error.message);
            setErrorMessage('Error tinting image. Please try again.');
        }
    };

    const copyToClipboard = () => {
        if (downloadLink) {
            navigator.clipboard.writeText(downloadLink).then(() => {
                setErrorMessage('URL copied to clipboard!');
                setTimeout(() => setErrorMessage(''), 3000);
            });
        }
    };

    const onReset = useCallback(() => {
        setSelectedFile(null);
        setTintedImage(null);
        setDownloadLink('');
        setTintAmount(50);
        setTintColor('#ff0000');
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
            <h2 className="text-4xl font-bold mb-8 text-gray-800">Tint Image</h2>
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
                <label className="block text-lg font-semibold mb-2">
                    Tint Amount (%):
                </label>
                <input
                    type="range"
                    min="1"
                    max="100"
                    value={tintAmount}
                    onChange={(e) => setTintAmount(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-lg w-full"
                />
                <span className="ml-4 text-lg">{tintAmount}%</span>
            </div>
            <div className="mb-8">
                <label className="block text-lg font-semibold mb-2">
                    Tint Color:
                </label>
                <input
                    type="color"
                    value={tintColor}
                    onChange={(e) => setTintColor(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg text-lg"
                />
            </div>
            <button onClick={onTint} className="bg-green-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-green-700 transition-colors duration-300 mr-4">
                Tint Image
            </button>
            <button onClick={onReset} className="bg-gray-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-gray-700 transition-colors duration-300">
                Reset
            </button>
            {tintedImage && (
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Tinted Image</h3>
                    <img src={tintedImage} alt="Tinted" className="max-w-full max-h-96 border border-gray-300 rounded-lg object-cover" />
                    <div className="mt-4 flex items-center">
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
                    <a
                        href={downloadLink}
                        download={`tinted.${selectedFile?.name.split('.').pop()}`}
                        className="bg-red-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-red-700 transition-colors duration-300 mt-4 inline-block"
                    >
                        Download Tinted Image
                    </a>
                    <div className="mt-8 flex justify-center">
                        <QRCode value={downloadLink} size={128} />
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}

export default Tint;