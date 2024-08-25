import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';

function TextImage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [textImage, setTextImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [text, setText] = useState('');
    const [x, setX] = useState('0');
    const [y, setY] = useState('0');
    const [color, setColor] = useState('#FFFFFF'); // Default text color
    const [errorMessage, setErrorMessage] = useState('');

    const allowedFormats = useMemo(() => ['png', 'gif', 'jpg', 'jpeg'], []);

    const onFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                setSelectedFile(file);
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setErrorMessage('Invalid image format. Only PNG, JPG, and JPEG are allowed.');
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
                setErrorMessage('Invalid image format. Only PNG, JPG, and JPEG are allowed.');
                setSelectedFile(null);
            }
        }
    }, [allowedFormats]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onAddText = async () => {
        if (!selectedFile || !text) {
            setErrorMessage('Please provide all required inputs.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('text', text);
        formData.append('x', x);
        formData.append('y', y);
        formData.append('color', color);

        try {
            const response = await axiosInstance.post('images/add-text', formData, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const blob = new Blob([response.data], { type: selectedFile.type });
            const url = URL.createObjectURL(blob);
            setTextImage(url);
            setDownloadLink(url);
            setErrorMessage(''); // Clear any previous error messages
        } catch (error) {
            console.error('Error adding text to image:', error.message);
            setErrorMessage('Error adding text to image. Please try again.');
        }
    };

    const onReset = () => {
        setSelectedFile(null);
        setTextImage(null);
        setDownloadLink('');
        setText('');
        setX('0');
        setY('0');
        setColor('#FFFFFF');
        setErrorMessage('');
    };

    const copyToClipboard = () => {
        if (downloadLink) {
            navigator.clipboard.writeText(downloadLink).then(() => {
                setErrorMessage('URL copied to clipboard!');
                setTimeout(() => setErrorMessage(''), 3000);
            });
        }
    };

    return (
        <div>
            <Navbar />
        
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="max-w-4xl mx-auto border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 mt-10 bg-white"
        >
            <h2 className="text-3xl font-bold mb-8 text-gray-800">Add Text to Image</h2>
            <input
                type="file"
                onChange={onFileChange}
                className="hidden"
                id="fileInput"
            />
            <label htmlFor="fileInput" className="block mb-6 p-4 bg-blue-500 text-white rounded-lg text-xl cursor-pointer hover:bg-blue-700 transition-colors duration-300">
                {selectedFile ? selectedFile.name : 'Drag and drop a file here, or click to select'}
            </label>
            {errorMessage && <p className="text-red-500 text-lg mt-4">{errorMessage}</p>}
            <div className="mb-6">
                <label htmlFor="textInput" className="block text-lg font-semibold mb-2">Text to Add</label>
                <input
                    type="text"
                    id="textInput"
                    placeholder="Enter text here"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg text-lg w-full"
                />
            </div>
            <div className="mb-6 grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="xPositionInput" className="block text-lg font-semibold mb-2">X Position</label>
                    <input
                        type="number"
                        id="xPositionInput"
                        placeholder="X position"
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg text-lg w-full"
                    />
                </div>
                <div>
                    <label htmlFor="yPositionInput" className="block text-lg font-semibold mb-2">Y Position</label>
                    <input
                        type="number"
                        id="yPositionInput"
                        placeholder="Y position"
                        value={y}
                        onChange={(e) => setY(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg text-lg w-full"
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="colorPicker" className="block text-lg font-semibold mb-2">Text Color</label>
                <input
                    type="color"
                    id="colorPicker"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-full"
                />
            </div>
            <div className="mb-6 flex justify-center gap-4">
                <button onClick={onAddText} className="bg-green-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-green-700 transition-colors duration-300">
                    Add Text
                </button>
                <button onClick={onReset} className="bg-gray-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-gray-700 transition-colors duration-300">
                    Reset
                </button>
            </div>
            {textImage && (
                <div className="mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Image with Text</h3>
                    <img src={textImage} alt="Text Added" className="max-w-full max-h-96 border border-gray-300 rounded-lg object-cover mx-auto" />
                    <div className="mt-4 flex items-center justify-center gap-4">
                        <input
                            type="text"
                            value={downloadLink}
                            readOnly
                            className="border border-gray-300 rounded-lg p-4 text-lg w-full bg-gray-100"
                        />
                        <button onClick={copyToClipboard} className="bg-blue-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-blue-700 transition-colors duration-300">
                            Copy URL
                        </button>
                    </div>
                    <a
                        href={downloadLink}
                        download={`text-added.${selectedFile?.name.split('.').pop()}`}
                        className="bg-red-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-red-700 transition-colors duration-300 mt-4 inline-block"
                    >
                        Download Image with Text
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

export default TextImage;
