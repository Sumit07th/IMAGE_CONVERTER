import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home() {
    return (
        <div className="min-h-screen bg-gray-200">
            <Navbar />
            <div className="container mx-auto px-6 py-16 pt-24">
                <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">TransForm Your Images with Ease</h1>
                <p className="text-lg text-gray-700 mb-12 text-center">
                    Explore our suite of image processing tools designed to help you convert, crop, resize, and enhance your images effortlessly. Choose an action below to get started and make your images perfect in no time.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Link to="/convert/png" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit1.jpeg" alt="Convert to PNG" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Convert to PNG</h2>
                            <p className="text-gray-700 text-base">Convert your images to high-quality PNG format for transparent backgrounds and lossless compression.</p>
                        </div>
                    </Link>
                    <Link to="/convert/jpeg" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit2.jpeg" alt="Convert to JPEG" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Convert to JPEG</h2>
                            <p className="text-gray-700 text-base">Easily convert your images to JPEG format for efficient storage and web-friendly compression.</p>
                        </div>
                    </Link>
                    <Link to="/convert/webp" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit3.jpeg" alt="Convert to WEBP" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Convert to WEBP</h2>
                            <p className="text-gray-700 text-base">Transform your images to WEBP format for smaller file sizes and improved web performance.</p>
                        </div>
                    </Link>
                    <Link to="/convert/tiff" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit4.jpeg" alt="Convert to TIFF" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Convert to TIFF</h2>
                            <p className="text-gray-700 text-base">Change your images to TIFF format for high-quality and detailed preservation suitable for professional use.</p>
                        </div>
                    </Link>
                    <Link to="/convert/avif" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit5.jpeg" alt="Convert to AVIF" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Convert to AVIF</h2>
                            <p className="text-gray-700 text-base">Convert your images to AVIF format for excellent image quality and compression efficiency.</p>
                        </div>
                    </Link>
                    <Link to="/convert/jpg" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit6.jpeg" alt="Convert to JPG" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Convert to JPG</h2>
                            <p className="text-gray-700 text-base">Convert your images to JPG format for widely compatible and compact files ideal for everyday use.</p>
                        </div>
                    </Link>
                    <Link to="/crop" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit7.jpeg" alt="Crop the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Crop the Image</h2>
                            <p className="text-gray-700 text-base">Crop your images to focus on the most important parts and enhance visual composition.</p>
                        </div>
                    </Link>
                    <Link to="/resize" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit8.jpeg" alt="Resize the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Resize the Image</h2>
                            <p className="text-gray-700 text-base">Resize your images to fit different dimensions and optimize them for various uses.</p>
                        </div>
                    </Link>
                    <Link to="/compress" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit11.jpeg" alt="Compress the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Compress the Image</h2>
                            <p className="text-gray-700 text-base">Compress your images to reduce file size while maintaining quality for faster loading times.</p>
                        </div>
                    </Link>
                    <Link to="/grayscale" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit16.jpeg" alt="Grayscale the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Grayscale the Image</h2>
                            <p className="text-gray-700 text-base">Convert your images to grayscale for a classic, timeless look or to focus on details.</p>
                        </div>
                    </Link>
                    <Link to="/tint" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit15.jpeg" alt="Tint the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Tint the Image</h2>
                            <p className="text-gray-700 text-base">Add a tint to your images to create unique effects and enhance the mood.</p>
                        </div>
                    </Link>
                    <Link to="/rotate" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit13.jpeg" alt="Rotate the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Rotate the Image</h2>
                            <p className="text-gray-700 text-base">Rotate your images to adjust the orientation and correct any skew.</p>
                        </div>
                    </Link>
                    <Link to="/blur" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit12.jpeg" alt="Blur the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Blur the Image</h2>
                            <p className="text-gray-700 text-base">Apply a blur effect to your images to soften details and create a dreamy look.</p>
                        </div>
                    </Link>
                    <Link to="/sharpen" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit10.jpeg" alt="Sharpen the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Sharpen the Image</h2>
                            <p className="text-gray-700 text-base">Enhance the details and edges of your images with a sharpening effect.</p>
                        </div>
                    </Link>
                    <Link to="/flip" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit14.jpeg" alt="Flip the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Flip the Image</h2>
                            <p className="text-gray-700 text-base">Flip your images horizontally or vertically to create mirror effects.</p>
                        </div>
                    </Link>
                    <Link to="/add-text" className="bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-xl rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        <div className="p-6">
                            <img src="/image/iit9.jpeg" alt="Write Text on the Image" className="w-16 h-16 mb-4" />
                            <h2 className="text-xl font-bold mb-2 text-gray-900">Write Text on the Image</h2>
                            <p className="text-gray-700 text-base">Add custom text to your images to create personalized messages and designs.</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
