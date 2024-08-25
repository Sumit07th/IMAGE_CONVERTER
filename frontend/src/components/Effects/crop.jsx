import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';

function Crop() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [left, setLeft] = useState('');
    const [top, setTop] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [copyMessage, setCopyMessage] = useState('');

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

    const onCrop = async () => {
        if (!selectedFile || !width || !height || !left || !top) {
            setErrorMessage('Please provide all the crop dimensions.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('left', left);
        formData.append('top', top);

        try {
            const response = await axiosInstance.post('images/crop', formData, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const blob = new Blob([response.data], { type: selectedFile.type });
            const url = URL.createObjectURL(blob);
            setCroppedImage(url);
            setDownloadLink(url);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error cropping image:', error.message);
            setErrorMessage('Error cropping image. Please try again.');
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
                className="max-w-4xl mx-auto p-8 text-center mt-10 bg-white shadow-lg rounded-lg border border-gray-200"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                <h2 className="text-5xl font-bold mb-8 text-gray-800">Crop Image</h2>
                <p className="mb-6 text-gray-600">
                    Crop images in <span className="text-blue-600">PNG</span>, 
                    <span className="text-blue-600">JPG</span>, 
                    <span className="text-blue-600">WEBP</span>, or 
                    <span className="text-blue-600">GIF</span> format.
                </p>
                <input
                    type="file"
                    onChange={onFileChange}
                    className="hidden"
                    id="fileInput"
                />
                <label
                    htmlFor="fileInput"
                    className="block mb-8 p-8 bg-blue-500 text-white rounded-lg text-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300"
                >
                    {selectedFile ? selectedFile.name : 'Drag and drop a file here, or click to select'}
                </label>
    
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 mt-6">
                    <input
                        type="number"
                        placeholder="Width"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="border border-gray-300 rounded-lg p-4 text-lg"
                    />
                    <input
                        type="number"
                        placeholder="Height"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="border border-gray-300 rounded-lg p-4 text-lg"
                    />
                    <input
                        type="number"
                        placeholder="Left"
                        value={left}
                        onChange={(e) => setLeft(e.target.value)}
                        className="border border-gray-300 rounded-lg p-4 text-lg"
                    />
                    <input
                        type="number"
                        placeholder="Top"
                        value={top}
                        onChange={(e) => setTop(e.target.value)}
                        className="border border-gray-300 rounded-lg p-4 text-lg"
                    />
                </div>
    
                <button
                    onClick={onCrop}
                    className="bg-green-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-green-700 transition-colors duration-300 mt-8"
                >
                    Crop
                </button>
    
                {errorMessage && (
                    <p className="text-red-500 text-xl mt-4">
                        {errorMessage}
                    </p>
                )}
    
                {croppedImage && (
                    <div className="mt-8">
                        <img
                            src={croppedImage}
                            alt="Cropped"
                            className="max-w-full max-h-96 border border-gray-300 rounded-lg object-cover"
                        />
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
                            <button
                                onClick={copyToClipboard}
                                className="bg-blue-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-blue-700 transition-colors duration-300"
                            >
                                Copy URL
                            </button>
                        </div>
                        {copyMessage && (
                            <p className="text-green-500 text-xl">
                                {copyMessage}
                            </p>
                        )}
                        <a
                            href={downloadLink}
                            download={`cropped.${selectedFile?.name.split('.').pop()}`}
                            className="bg-red-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-red-700 transition-colors duration-300 mt-4"
                        >
                            Download Cropped Image
                        </a>
                        <QRCode value={downloadLink} size={128} className="mt-8" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Crop;
