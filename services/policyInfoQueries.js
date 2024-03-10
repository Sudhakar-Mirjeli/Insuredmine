
function getPolicyInfoQuery(search) {
    return [
        {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'userId'
            }
        },
        {
            '$unwind': {
                'path': '$userId',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            "$match": {
                "userId.firstName": new RegExp(search, 'i')
            }
        }
    ]

}

function getEachUserPolicyInfoQuery() {
    return [
        {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'userId'
            }
        },
        {
            '$unwind': {
                'path': '$userId',
                'preserveNullAndEmptyArrays': true
            }
        },
        {
            "$group": {
                _id: "$userId",
                'policyInfo': {
                    '$push': '$$ROOT'
                },
                totalPolicies: { $sum: 1 } // Count total policies per user
            }
        },
        {
            "$project": {
                _id: 0,
                policyInfo: "$policyInfo",
                totalPolicies: "$totalPolicies"
            }

        }
    ]

}

module.exports = { getPolicyInfoQuery, getEachUserPolicyInfoQuery }