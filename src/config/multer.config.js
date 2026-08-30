import multer from "multer";
import path from "path";
import fs from "fs";

const uploadsRoot = path.resolve("uploads");

const userDocumentsPath = path.join(
    uploadsRoot,
    "users"
);

const receiptsPath = path.join(
    uploadsRoot,
    "receipts"
);

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, {
            recursive: true,
        });
    }
};

ensureDirectoryExists(userDocumentsPath);
ensureDirectoryExists(receiptsPath);

const allowedMimeTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
];

const fileFilter = (req, file, cb) => {

    if (!allowedMimeTypes.includes(file.mimetype)) {
        const error = new Error(
            "INVALID_FILE_TYPE"
        );

        return cb(error, false);
    }

    cb(null, true);
};

const generateFilename = (
    req,
    file,
    cb
) => {

    const uniqueSuffix =
        `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}`;

    const extension =
        path.extname(file.originalname);

    cb(
        null,
        `${uniqueSuffix}${extension}`
    );
};

const userStorage = multer.diskStorage({

    destination: (
        req,
        file,
        cb
    ) => {
        cb(null, userDocumentsPath);
    },

    filename: generateFilename,
});

const receiptStorage = multer.diskStorage({

    destination: (
        req,
        file,
        cb
    ) => {
        cb(null, receiptsPath);
    },

    filename: generateFilename,
});

const limits = {
    fileSize: 5 * 1024 * 1024,
};

export const uploadUserDocument =
    multer({
        storage: userStorage,
        fileFilter,
        limits,
    });

export const uploadReceipt =
    multer({
        storage: receiptStorage,
        fileFilter,
        limits,
    });

export const uploadPaths = {
    users: userDocumentsPath,
    receipts: receiptsPath,
};