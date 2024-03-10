const HTTP_STATUS = require('../constants/http-status/httpConstants');
const logger = require('../utilities/logger');
const MessageService = require('../services/messageService')
const AgendaService = require('../utilities/agendaService')



/**
 * @method MessageController:getPolicyInfo
 * @description save message
 * @param {*} req express request handler to handle requests
 * @param {*} res express response handler to handle response
 * @returns successful response 
 */
async function scheduleMessage(req, res) {
    try {
        logger.info('Inside MessageController: scheduleMessage method');
        
        const response = await AgendaService.scheduleMessage(req.body);
        return res.status(HTTP_STATUS.OK).json(response);
    } catch (error) {
        logger.error(`Inside MessageController: scheduleMessage method: Error occurred while scheduling message info. ${error}`);
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error.message
        });
    }
}

module.exports = {
    scheduleMessage
}
