const sharp = require('sharp');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper');
const { saveHistory } = require('./historyController');
const allowedFormats = require('../utils/allowedFormats'); // Assuming this is where allowedFormats are defined

// Convert image format
exports.convertImage = async (req, res) => {
    try {
        const { targetFormat } = req.params;
        const { buffer, mimetype } = req.file;
        const originalFormat = mimetype.split('/')[1];

        // Debugging info
        console.log(`Original format: ${originalFormat}, Target format: ${targetFormat}`);
        console.log(`Allowed formats for ${originalFormat}: ${allowedFormats.convert[originalFormat]}`);

        if (!allowedFormats.convert[originalFormat] || !allowedFormats.convert[originalFormat].includes(targetFormat)) {
            return res.status(400).send(`Invalid conversion. Original format: ${originalFormat}, Target format: ${targetFormat}`);
        }

        const convertedImage = await sharp(buffer).toFormat(targetFormat).toBuffer();

        if (req.user) {
            try {
                console.log("in history")
                const result = await uploadToCloudinary(convertedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'convert', originalFormat, targetFormat, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${targetFormat}`);
        res.send(convertedImage);
    } catch (error) {
        console.error('Error converting image:', error);
        res.status(500).send('Error converting image.');
    }
};

// Resize image
exports.resizeImage = async (req, res) => {
    try {
        const { width, height } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.resize.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const resizedImage = await sharp(buffer).resize(parseInt(width), parseInt(height)).toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(resizedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'resize', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(resizedImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Crop image
exports.cropImage = async (req, res) => {
    try {
        const { width, height, left, top } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.crop.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const croppedImage = await sharp(buffer)
            .extract({ 
                width: parseInt(width), 
                height: parseInt(height), 
                left: parseInt(left), 
                top: parseInt(top) 
            })
            .toBuffer();

        let imageUrl;
        if (req.user) {
            try {
                const result = await uploadToCloudinary(croppedImage, { resource_type: 'image' });
                imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'crop', format, format, imageUrl);
            } catch (error) {
                console.error('Error uploading image to Cloudinary:', error.message);
                return res.status(500).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(croppedImage);
    } catch (error) {
        console.error('Error cropping image:', error.message); // Log the error for debugging
        res.status(500).send('Error cropping image.');
    }
};

// Compress image
exports.compressImage = async (req, res) => {
    try {
        const { quality } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.compress.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const compressedImage = await sharp(buffer).jpeg({ quality: parseInt(quality) }).toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(compressedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'compress', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(compressedImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Convert to grayscale
exports.convertToGrayscale = async (req, res) => {
    try {
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.grayscale.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const grayscaleImage = await sharp(buffer).grayscale().toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(grayscaleImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'grayscale', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(grayscaleImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Tint image
exports.tintImage = async (req, res) => {
    try {
        const { tintColor } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.tint.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const tintedImage = await sharp(buffer).tint(tintColor).toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(tintedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'tint', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(tintedImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Rotate image
exports.rotateImage = async (req, res) => {
    try {
        const { angle } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.rotate.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const rotatedImage = await sharp(buffer).rotate(parseInt(angle)).toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(rotatedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'rotate', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(rotatedImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Blur image
exports.blurImage = async (req, res) => {
    try {
        const { blurAmount } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.blur.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const blurredImage = await sharp(buffer).blur(parseFloat(blurAmount)).toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(blurredImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'blur', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(blurredImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Sharpen image
exports.sharpenImage = async (req, res) => {
    try {
        const { sharpenAmount } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.sharpen.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const sharpenedImage = await sharp(buffer).sharpen(parseFloat(sharpenAmount)).toBuffer();

        if (req.user) {
            try {
                const result = await uploadToCloudinary(sharpenedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'sharpen', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(sharpenedImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Flip image
exports.flipImage = async (req, res) => {
    try {
        const { direction } = req.body; // 'horizontal' or 'vertical'
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.flip.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        let flippedImage;
        const image = sharp(buffer);

        if (direction === 'horizontal') {
            flippedImage = await image.flop().toBuffer();
        } else if (direction === 'vertical') {
            flippedImage = await image.flip().toBuffer();
        } else {
            return res.status(400).send('Invalid direction. Use "horizontal" or "vertical".');
        }

        if (req.user) {
            try {
                const result = await uploadToCloudinary(flippedImage, { resource_type: 'image' });
                const imageUrl = result.secure_url;
                await saveHistory(req.user._id, 'flip', format, format, imageUrl);
            } catch (error) {
                console.log(error);
                return res.status(400).send('Error uploading image to Cloudinary.');
            }
        }

        res.set('Content-Type', `image/${format}`);
        res.send(flippedImage);
    } catch (error) {
        res.status(500).send('Error converting image.');
    }
};

// Add text to image
exports.addTextToImage = async (req, res) => {
    try {
        const { text, x, y, color } = req.body;
        const { buffer, mimetype } = req.file;
        const format = mimetype.split('/')[1];

        if (!allowedFormats.addText.includes(format)) {
            return res.status(400).send('Invalid file format.');
        }

        const svgText = `
            <svg width="100%" height="100%">
                <text x="${x}" y="${y}" font-size="30" fill="${color}">${text}</text>
            </svg>
        `;

        const addedTextImage = await sharp(buffer)
            .composite([{ input: Buffer.from(svgText), gravity: 'center' }])
            .toBuffer();

            if (req.user) {
                try {
                    const result = await uploadToCloudinary(addedTextImage, { resource_type: 'image' });
                    const imageUrl = result.secure_url;
                    await saveHistory(req.user._id, 'add-text', format, format, imageUrl);
                } catch (error) {
                    console.log(error);
                    return res.status(400).send('Error uploading image to Cloudinary.');
                }
            }
    
            res.set('Content-Type', `image/${format}`);
            res.send(addedTextImage);
        } catch (error) {
            res.status(500).send('Error converting image.');
        }
    };
