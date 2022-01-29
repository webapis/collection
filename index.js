console.log('index.js loaded')

function extractPercentage(val1,val2){
 

    const value1ll=parseInt(val1.substring(0,leftLastIndex(val1)).replace('.',''))
   // const value1ss =rightSideValue(val1)
    const value2ll=parseInt( val2.substring(0,leftLastIndex(val2)).replace('.',''))
 //   const value2ss =rightSideValue(val2)

    const percentage =Math.floor( (((value1ll)-(value2ll))*100)/(value1ll))
 return  percentage
}



function leftLastIndex(value){
return value.lastIndexOf(',') !==-1 ?value.lastIndexOf(','):value.length
}

// function rightSideValue(value){
//     let v = value.lastIndexOf(',') !==-1 ?  parseInt( value.substring(value.lastIndexOf(',')+1)):0
  
// return  v >=50 ? 1 :0
// }