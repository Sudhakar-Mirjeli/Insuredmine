const HTTP_STATUS = require('../constants/http-status/httpConstants');
const logger = require('../utilities/logger');
const PolicyInfoService = require('../services/policyInfoService')

/**
 * @method PolicyInfoController:uploadFileData
 * @description upload file data of policy, user 
 * @param {*} req express request handler to handle requests
 * @param {*} res express response handler to handle response
 * @returns successful response after creation data
 */
async function uploadFileData(req, res) {
    try {
        logger.info('Inside PolicyInfoController: uploadFileData method');
        const response = await PolicyInfoService.uploadFileData(req.file);
        if (!response) throw new Error('Error while bulk importing data, please try after some time', HTTP_STATUS.INTERNAL_SERVER_ERROR);
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(`Inside PolicyInfoController: uploadFileData method: Error occurred while adding data. ${error}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
}

/**
 * @method PolicyInfoController:getPolicyInfo
 * @description fetch policy info, by user name 
 * @param {*} req express request handler to handle requests
 * @param {*} res express response handler to handle response
 * @returns successful response after fetch
 */
async function getPolicyInfo(req, res) {
    try {
        logger.info('Inside PolicyInfoController: getPolicyInfo method');
        const response = await PolicyInfoService.getPolicyInfo(req.query.userName);
        if (!response) throw new Error('Error while fetching policy info, please try after some time', HTTP_STATUS.INTERNAL_SERVER_ERROR);
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(`Inside PolicyInfoController: getPolicyInfo method: Error occurred while fetching policy info. ${error}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    uploadFileData,
    getPolicyInfo
}