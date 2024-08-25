// utils/allowedFormats.js

const allowedFormats = {
    convert: {
        jpeg: ['png', 'webp', 'tiff', 'svg', 'raw', 'avif', 'gif', 'jpg'],
        png: ['jpeg', 'webp', 'tiff', 'svg', 'raw', 'avif', 'gif', 'jpg'],
        webp: ['png', 'jpeg', 'tiff', 'svg', 'raw', 'avif', 'gif', 'jpg'],
        jpg: ['png', 'webp', 'tiff', 'svg', 'raw', 'avif', 'gif', 'jpeg'],
        avif: ['png', 'webp', 'tiff', 'svg', 'raw', 'jpeg', 'gif', 'jpg'],
        tiff: ['png', 'webp', 'jpeg', 'svg', 'raw', 'avif', 'gif', 'jpg']
    },
    compress: ['png', 'gif', 'jpg', 'jpeg'],
    resize: ['png', 'gif', 'jpg', 'jpeg'],
    crop: ['png', 'gif', 'jpg', 'jpeg'],
    grayscale: ['png', 'gif', 'jpg', 'jpeg'],
    tint: ['png', 'gif', 'jpg', 'jpeg'],
    rotate: ['png', 'gif', 'jpg', 'jpeg'],
    blur: ['png', 'gif', 'jpg', 'jpeg'],
    sharpen: ['png', 'gif', 'jpg', 'jpeg'],
    flip: ['png', 'gif', 'jpg', 'jpeg'],
    addText: ['png', 'gif', 'jpg', 'jpeg']
};

module.exports = allowedFormats;
