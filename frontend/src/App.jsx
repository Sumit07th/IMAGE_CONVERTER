import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ConverterPNG from './components/converters/ConverterPNG.jsx';
import ConverterJPEG from './components/converters/ConverterJPEG.jsx';
import ConverterWEBP from './components/converters/ConverterWEBP.jsx';
import ConverterTIFF from './components/converters/ConverterTIFF.jsx';
import ConverterAVIF from './components/converters/ConverterAVIF.jsx';
import ConverterJPG from './components/converters/ConverterJPG.jsx';
import Crop from './components/Effects/crop.jsx';
import Resize from './components/Effects/resize.jsx';
import Compress from './components/Effects/compress.jsx';
import Grayscale from './components/Effects/grayscale.jsx';
import Tinting from './components/Effects/tint.jsx';
import Rotate from './components/Effects/rotate.jsx';
import Blur from './components/Effects/blur.jsx';
import Sharpen from './components/Effects/sharpen.jsx';
import Flip from './components/Effects/flip.jsx';
import TextImage from './components/Effects/addtext.jsx';
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import History from "./components/History.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
                <Route path="/convert/png" element={<ConverterPNG />} />
                <Route path="/convert/jpeg" element={<ConverterJPEG />} />
                <Route path="/convert/webp" element={<ConverterWEBP />} />
                <Route path="/convert/tiff" element={<ConverterTIFF />} />
                <Route path="/convert/avif" element={<ConverterAVIF />} />
                <Route path="/convert/jpg" element={<ConverterJPG />} />
                <Route path="/crop" element={<Crop />} />
                <Route path="/resize" element={<Resize />} />
                <Route path="/compress" element={<Compress />} />
                <Route path="/grayscale" element={<Grayscale />} />
                <Route path="/tint" element={<Tinting />} />
                <Route path="/rotate" element={<Rotate />} />
                <Route path="/blur" element={<Blur />} />
                <Route path="/sharpen" element={<Sharpen />} />
                <Route path="/flip" element={<Flip />} />
                <Route path="/add-text" element={<TextImage />} />
                <Route path="*" element={<div>404 Not Found</div>} />
            </Routes>
        </Router>
    );
}

export default App;