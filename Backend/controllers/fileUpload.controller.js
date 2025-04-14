const multer = require("multer");
const path = require("path");

// Set up storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Ensure 'uploads/' directory exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// File filter: Accept only PDFs
const fileFilter = (req, file, cb) => {
    const fileExt = path.extname(file.originalname).toLowerCase();
    if (fileExt !== ".pdf") {
        return cb(new Error("Only PDF files are allowed"), false);
    }
    cb(null, true);
};

// Multer configuration
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB file size limit
});

const uploadFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded or invalid file format" });
    }

    res.status(200).json({ message: "File uploaded successfully", file: req.file.filename });
};

module.exports = { upload, uploadFile };
