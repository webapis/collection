require('dotenv').config()

const {nodeFetch}=require('../../node-fetch')


const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
    const { gender, subcategory, page, category } = event.queryStringParameters
    let spreadsheetId = ''
debugger;
if(gender){
    switch (gender) {
        case 'erkek':
            spreadsheetId = '1IeaYAURMnrbZAsQA_NO_LA_y_qq8MmwxjSo854vz5YM'
            break;
        case 'kadın':
            spreadsheetId = '12mKtqxu5A-CVoXP_Kw36JxKiC69oPUUXVQmm7LUfh3s'
            break;
        default:


    }

debugger;
 const response =await nodeFetch({host:'sheets.googleapis.com',path:`/v4/spreadsheets/${spreadsheetId}/values/DATA!A2%3AP50?majorDimension=ROWS&key=AIzaSyDb8Z27Ut0WJ-RH7Exi454Bpit9lbARJeA`, method:'GET',headers: { 'User-Agent': 'node.js', 'Content-Type': 'application/json' }})

debugger;
 
    debugger;
    return {
        statusCode: 200, headers,
        body: response
    }
} else{
    return {
        statusCode: 401, headers,
        body: ''
    }
}


}

