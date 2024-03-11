const { workerData, parentPort } = require('node:worker_threads');
const fs = require('fs');
const csv = require('csv-parser');
const  AgentModel = require('../models/agentsModel');
const PolicyCarrierModel  = require('../models/policyCarriersModel');
const UsersAccountModel  = require('../models/usersAccountModel');
const PolicyCategoryModel  = require('../models/policyCategoriesModel');
const PolicyInfoModel = require('../models/policyInfoModel');
const UserModel = require('../models/usersModel');
let connectToMongoDB = require('../dbConnection')

connectToMongoDB()

let csvData = [];
try {

    fs.createReadStream(workerData.filePath)
        .pipe(
            csv({
                delimiter: ','
            }))
        .on('data', async function (dataRow) {
            csvData.push(dataRow);
        })
        .on('end', async () => {

            for (let i = 0; i < csvData.length; i++) {
                try {
                    // creating Agent 
                    let agentObj = {
                        agentName: csvData[i].agent
                    }
                    let agent = new AgentModel(agentObj)
                    await agent.save()

                    // creating policy carriers
                    let policyCarrierObj = {
                        companyName: csvData[i].company_name
                    }
                    let policyCarrier = new PolicyCarrierModel(policyCarrierObj)
                    await policyCarrier.save()

                    // creating user account
                    let userAccountObj = {
                        accountName: csvData[i].account_name
                    }
                    let userAccount = new UsersAccountModel(userAccountObj)
                    await userAccount.save()

                    // creating policy categories
                    let policyCategoryObj = {
                        categoryName: csvData[i].category_name
                    }
                    let policyCategory = new PolicyCategoryModel(policyCategoryObj)
                    await policyCategory.save()

                    // creating user
                    let userObj = {
                        firstName: csvData[i].firstname,
                        DOB: csvData[i].dob,
                        address: csvData[i].address,
                        phoneNumber: csvData[i].phone,
                        state: csvData[i].state,
                        zipCode: csvData[i].zip,
                        email: csvData[i].email,
                        gender: csvData[i].gender,
                        userType: csvData[i].userType
                    }
                    let user = new UserModel(userObj)
                    await user.save()

                    // creating PolicyInfoModel
                    let policyInfoObj = {
                        policyNumber: csvData[i].policy_number,
                        policyStartDate: csvData[i].policy_start_date,
                        policyEndDate: csvData[i].policy_end_date,
                        policyCategoryId: policyCategory._id,
                        policyCarrierId: policyCarrier._id,
                        userId: user._id
                    }
                    const policyInfo = new PolicyInfoModel(policyInfoObj);
                    await policyInfo.save()

                } catch (error) {
                    this.logger.error(`Error while adding data into database: ${error}`);
                }
            }
            parentPort.postMessage({ success: true, message: 'Data added success' });
        })
        .on('error', (error) => {
            parentPort.postMessage({ success: false, error: error.message });
        });
} catch {
    ((err) => {
        console.error('Error connecting to MongoDB:', err);
    })
}