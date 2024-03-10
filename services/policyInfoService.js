const HTTP_STATUS = require('../constants/http-status/httpConstants');
const logger = require('../utilities/logger');
const { Worker, isMainThread } = require('node:worker_threads');
const fs = require('fs').promises;
const policyInfoQueries = require('../services/policyInfoQueries');
const { PolicyInfoModel } = require('../models/policyInfoModel');


/**
 * @method PolicyInfoService:uploadFileData
 * @description upload file data of policy, user 
 * @param {*} file file requests
 * @returns successful response after creation data
 */
async function uploadFileData(file) {
    try {
        logger.info('Inside PolicyInfoService: uploadFileData method');

        if (!file || !file.path)
            throw new Error('Please provide a valid file path.', HTTP_STATUS.BAD_REQUEST);

        const csvFilePath = file.path;

        // Validate file path and existence
        try {
            await fs.access(csvFilePath);
        } catch (error) {
            throw new Error('File does not exist or is inaccessible.', HTTP_STATUS.NOT_FOUND);
        }

        if (isMainThread) {
            const worker = new Worker('./utilities/worker.js', {
                workerData: { filePath: csvFilePath },
            });

            return new Promise((resolve, reject) => {
                worker.on('message', (message) => {
                    if (message.success) {
                        console.log('File processed successfully');
                        resolve({ status: true, message: 'Data added successfully.' });
                    } else {
                        console.error('Error processing file:', message.error);
                        reject(new Error('Error processing file: ' + message.error));
                    }
                    worker.terminate(); // Worker is terminated after processing
                });

                worker.on('error', (error) => {
                    console.error('Worker error:', error);
                    reject(error);
                    worker.terminate();
                });
            });
        }
    } catch (error) {
        logger.error(`Error while bulk importing data: ${error.message}`);
        throw new Error('Error while bulk importing data, Error! Please try again.', error);
    }
}


/**
 * @method PolicyInfoService:getPolicyInfo
 * @description fetch policy info, by user name 
 * @param {*} searchQuery user name
 * @returns successful response after fetching
 */
async function getPolicyInfo(searchQuery) {
    try {
        logger.info('Inside PolicyInfoService: getPolicyInfo method');
        let policyInfo = []

        // policy info data by user name search
        if (searchQuery) {
            const policyInfoQuery = policyInfoQueries.getPolicyInfoQuery(searchQuery)
            policyInfo = await PolicyInfoModel.aggregate([...policyInfoQuery])
        }
        // policy info data by each user 
        else {
            const policyInfoQuery = policyInfoQueries.getEachUserPolicyInfoQuery()
            policyInfo = await PolicyInfoModel.aggregate([...policyInfoQuery])
        }
        return {
            status: true,
            data: policyInfo,
            message: 'Policy info retrieved successfully.'
        }

    } catch (error) {
        logger.error(`Error while fetching policy info: ${error.message}`);
        throw new Error('Error while fetching policy info, Error! Please try again.', error);
    }
}


module.exports = {
    uploadFileData,
    getPolicyInfo
}