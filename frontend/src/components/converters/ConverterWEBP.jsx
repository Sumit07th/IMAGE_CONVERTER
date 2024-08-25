import React, { useState, useCallback, useMemo } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import Navbar from '../Navbar';
import axiosInstance from '../../utils/axiosInstance';

function ConverterWEBP() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [convertedImage, setConvertedImage] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');
    const [error, setError] = useState('');
    const [copyMessage, setCopyMessage] = useState('');

    const allowedFormats = useMemo(() => ['jpeg', 'png', 'tiff', 'svg', 'avif', 'gif', 'jpg'], []);

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        setError('');
    };

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const file = e.dataTransfer.files[0];
        if (file) {
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (allowedFormats.includes(fileExtension)) {
                setSelectedFile(file);
                setError('');
            } else {
                setError(`Invalid file format. Only ${allowedFormats.join(', ')} can be converted to WEBP.`);
            }
        }
    }, [allowedFormats]);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file.');
            return;
        }

        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (!allowedFormats.includes(fileExtension)) {
            setError(`Invalid file format. Only ${allowedFormats.join(', ')} can be converted to WEBP.`);
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axiosInstance.post('images/convert/webp', formData, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const blob = new Blob([response.data], { type: 'image/webp' });
            const url = URL.createObjectURL(blob);
            setConvertedImage(url);
            setDownloadLink(url);
        } catch (error) {
            console.error('Error uploading image:', error.message);
            setError('Error converting image.');
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
            <Navbar/>
        <div
            className="max-w-4xl mx-auto p-8 text-center cursor-pointer mt-10"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <h2 className="text-5xl font-bold mb-10 text-gray-800">Convert images to WEBP</h2>
            <p className="mb-6 text-gray-600">
                    Transform <span className="text-blue-600">JPEG</span>, 
                    <span className="text-blue-600">GIF</span>, 
                    <span className="text-blue-600">TIF</span>, 
                    <span className="text-blue-600">AVIF</span>, 
                    <span className="text-blue-600">SVG</span>, 
                    <span className="text-blue-600">PNG</span>, 
                    <span className="text-blue-600">GIF</span>, or 
                    <span className="text-blue-600">JPG</span> to WEBP format.
                    <br/>
                    
                </p>
            <input
                type="file"
                onChange={onFileChange}
                className="hidden"
                id="fileInput"
            />
           <label
    htmlFor="fileInput"
    className="block mb-8 p-8 bg-blue-500 text-white rounded-lg text-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 w-full max-w-md mx-auto text-center"
>
    {selectedFile ? selectedFile.name : 'Drag and drop a file here, or click to select'}
</label>

            <button onClick={onUpload} className="bg-green-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-green-700 transition-colors duration-300 mb-8">
                Convert
            </button>
            {error && <p className="text-red-500 text-xl mt-4">{error}</p>}
            {convertedImage && (
                <div className="mt-8">
                    <img src={convertedImage} alt="Converted" className="max-w-full max-h-96 border border-gray-300 rounded-lg object-cover" />
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
                    <a href={downloadLink} download="converted.webp" className="bg-red-500 text-white py-3 px-6 rounded-lg text-2xl hover:bg-red-700 transition-colors duration-300 mt-4">
                        Download Converted Image
                    </a>
                    <QRCode value={downloadLink} size={128} className="mt-8" />
                </div>
            )}
        </div>
        </div>
    );
}

export default ConverterWEBP;
