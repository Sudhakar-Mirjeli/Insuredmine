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
                    console.log("csvData.length", AgentModel,csvData[i].agent)
                    // creating Agent 
                    let agentObj = {
                        agentName: csvData[i].agent
                    }
                    let agent = await AgentModel.create(agentObj)
console.log("36666666666666666666")
                    // creating policy carriers
                    let policyCarrierObj = {
                        companyName: csvData[i].company_name
                    }
                    let policyCarrier = new PolicyCarrierModel(policyCarrierObj)
                    await policyCarrier.save()
                    console.log("43333333333333333333")

                    // creating user account
                    let userAccountObj = {
                        accountName: csvData[i].account_name
                    }
                    let userAccount = new UsersAccountModel(userAccountObj)
                    await userAccount.save()
                    console.log("5111111111111111111111111111")

                    // creating policy categories
                    let policyCategoryObj = {
                        categoryName: csvData[i].category_name
                    }
                    let policyCategory = new PolicyCategoryModel(policyCategoryObj)
                    await policyCategory.save()

                    console.log("600000000000000000000")

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
                    console.log("7666666666666666666")


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
                    console.log("900000000000000000000000000000000000")


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