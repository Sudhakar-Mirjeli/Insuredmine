const router = require('express').Router();
const PolicyInfoController = require('../controllers/policyInfoController');
const MessageController = require('../controllers/messageController');
const multer = require('multer');
const util = require('util');
const fs = require('fs');
const mkdirp = util.promisify(fs.mkdir);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dest = './fileData/';
        mkdirp(dest).then((err) => {
            if (err) {
                cb(err, dest);
            } else {
                cb(null, dest);
            }
        }).catch(() => cb(null, dest));
    },
    filename: function (req, file, cb) {
        // Use a unique identifier for the filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

/**
 * Upload file data route
 */
router.post('/upload-file-data', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    // Process the uploaded file
    PolicyInfoController.uploadFileData(req, res);
});

/**
 * Policy info data route
 */
router.get('/policyInfo', (req, res) => PolicyInfoController.getPolicyInfo(req, res))

/**
 * Add message data route 
 * 
 */
router.post('/schedule-messages', (req, res) => MessageController.scheduleMessage(req, res))


module.exports = router;
