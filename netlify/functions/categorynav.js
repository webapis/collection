require('dotenv').config()

const {nodeFetch}=require('../../nodefetch')
//const uri = process.env.DEPLOY_URL === 'http://localhost:8888' ? process.env.mongodb_localUrl : process.env.mongodb_url;
const uri = process.env.mongodb_url;
console.log('process.env', process.env)
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
};

exports.handler = async function (event, context) {
    const { gender, subcategory, page, category } = event.queryStringParameters
    let spreadsheetId = ''
    
    if (gender) {
        switch (gender) {
            case 'erkek':
                spreadsheetId = '1IeaYAURMnrbZAsQA_NO_LA_y_qq8MmwxjSo854vz5YM'
                break;
            case 'kadın':
                spreadsheetId = '12mKtqxu5A-CVoXP_Kw36JxKiC69oPUUXVQmm7LUfh3s'
                break;
            default:


        }


        const response = await nodeFetch({ host: 'sheets.googleapis.com', path: `/v4/spreadsheets/${spreadsheetId}/values/NAV!A%3AC?majorDimension=ROWS&key=AIzaSyDb8Z27Ut0WJ-RH7Exi454Bpit9lbARJeA`, method: 'GET', headers: { 'User-Agent': 'node.js', 'Content-Type': 'application/json' } })
 
        const {values} =JSON.parse(response)
  

        const mapValues = values.filter((f, i) => i > 0).map(v => {
            const subcategory = v[0]
            const category = v[1]
            const total = v[2]
            return { subcategory, category, total }

        })

        const groupByCategory = mapValues.reduce((group, product) => {
            const { category } = product;
            group[category] = group[category] ?? [];
            group[category].push(product);
            return group;
        }, {});

        const mapCategoryTotal = {}
        for (let o in groupByCategory) {

            const current = groupByCategory[o]
            const subcategories = Object.values(current)
            const totalSubcategories = subcategories.reduce((p, c, i) => {
                return p + parseInt(c.total)

            }, 0)
            mapCategoryTotal[o] = {}
            mapCategoryTotal[o]['total'] = totalSubcategories
      
            mapCategoryTotal[o]['subcategories'] = subcategories
        

        }
  
        return {
            statusCode: 200, headers,
            body: JSON.stringify(mapCategoryTotal)
        }
    } else {
        return {
            statusCode: 401, headers,
            body: ''
        }
    }

}

