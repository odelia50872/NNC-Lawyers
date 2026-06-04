const query=require('./SQLRequests') ;
const db = require('../tools/db');

const getFinancialReportById=async(id)=>{
    return query.queryGet('financial_reports', id)
}

const getAllFinancialReportsByUserId=async(userId)=>{
    return query.queryGetByUserId('financial_reports', userId)
}

const createFinancialReport=async(userId, data)=>{
    return query.queryPost('financial_reports', {userId: userId, data: JSON.stringify(data)})
}

const deleteFinancialReport=async(id)=>{
    return query.queryDelete('financial_reports', id)
}

const updateFinancialReport=async(id, data)=>{
    return query.queryUpdate('financial_reports', id, {data: JSON.stringify(data)})
}

module.exports={getFinancialReportById, getAllFinancialReportsByUserId, createFinancialReport, deleteFinancialReport, updateFinancialReport }

