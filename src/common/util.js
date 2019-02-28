export function judge(str){
    let finalNum;

    if(str===null){
        return " ";
    }
    if(str === "NaN"){
        return " ";
    }
    else if(str === 0){
        return " ";
    }
    let endChar = str[str.length-1];
    if( endChar < '0' || endChar > '9' ) {
        if( str.length > 4 ) {
            finalNum = str.substr(0,2);
            if ( str[2] === '.' ) {
                finalNum += endChar;
            }else {
                finalNum =  finalNum + str[2] + endChar;
            }
        }else {
            finalNum = str;
        }
    }
    else if(str < 10 && str > 0){
        let num = Number(str);
        finalNum = num.toFixed(2);
    }
    else if(str >= 10 && str < 100){
        let num = Number(str);
        finalNum = num.toFixed(1);
    }
    else if(str >= 100 && str < 1000){
        let num = Number(str);
        finalNum = num.toFixed(0);
    }
    else if(str >= 1000 && str < 10000){
        let num = Number(str/1000);
        finalNum = num.toFixed(1)+"K";
    }
    else if(str >= 10000 && str < 100000){
        let num = Number(str/1000);
        finalNum = num.toFixed(0)+"K";
    }
    else if(str >= 100000 && str < 1000000){
        let num = Number(str/1000);
        finalNum = num.toFixed(0)+"K";
    }
    else if(str >= 1000000 && str < 10000000){
        let num = Number(str/1000000);
        finalNum = num.toFixed(1)+"M";
    }
    else if(str >= 10000000 && str < 1000000000){
        let num = Number(str/1000000);
        finalNum = num.toFixed(0)+"M";
    }
    else if(str >= 1000000000 && str < 10000000000){
        let num = Number(str/1000000000);
        finalNum = num.toFixed(1)+"G";
    }
    else if(str >= 10000000000 && str < 1000000000000){
        let num = Number(str/1000000000);
        finalNum = num.toFixed(0)+"G";
    }
    else if(str >= 1000000000000 && str < 10000000000000){
        let num = Number(str/1000000000000);
        finalNum = num.toFixed(1)+"T";
    }
    else if(str >= 10000000000000 && str < 1000000000000000){
        let num = Number(str/1000000000000);
        finalNum = num.toFixed(0)+"T";
    }
    else if(str >= 1000000000000000 && str < 10000000000000000){
        let num = Number(str/1000000000000000);
        finalNum = num.toFixed(1)+"P";
    }
    else if(str >= 10000000000000000 && str < 1000000000000000000){
        let num = Number(str/1000000000000000);
        finalNum = num.toFixed(0)+"P";
    }
    else if(str >= 1000000000000000000 && str < 10000000000000000000){
        let num = Number(str/1000000000000000000);
        finalNum = num.toFixed(1)+"Z";
    }
    else if(str >= 10000000000000000000 && str < 1000000000000000000000){
        let num = Number(str/1000000000000000000);
        finalNum = num.toFixed(0)+"Z";
    }
    else if(str >= 1000000000000000000000 && str < 10000000000000000000000){
        let num = Number(str/1000000000000000000000);
        finalNum = num.toFixed(1)+"Y";
    }
    else if(str >= 10000000000000000000000 && str < 1000000000000000000000000){
        let num = Number(str/1000000000000000000000);
        finalNum = num.toFixed(0)+"Y";
    }
    else
        finalNum = str;

    // add judge .00
    return judgeInt( finalNum );
}

// 去掉整数尾巴上的.00
export function judgeInt(str) {
    let finalStr = str;
    let speechStr = str.split(".");
    if ( speechStr.length !== 1 ) {
        // deal with K M G T
        let tailStr = speechStr[ speechStr.length - 1 ];
        let tailChar = tailStr[ tailStr.length - 1 ];
        if ( "K M G T ".indexOf(tailChar) === -1 ) {
            tailChar = '';
        }
        if ( parseInt(tailStr) === 0 ) {
            finalStr = speechStr[0] + tailChar;
        }
    }

    return finalStr;
}

export function judgePercent(str){
    if(str === "NaN"){
        return " ";
    }
    else if((str>=0.01 && str<=9.99)||(str<=-0.01 && str>=-9.99)){
        let num = Number(str);
        return num.toFixed(2);
    }
    else if((str>=10.0 && str<99.9)||(str<=-10.0 && str>-99.9)){
        let num = Number(str);
        return num.toFixed(1);
    }
    else if((str < 0.01 && str >= 0) || (str > -0.01 && str <=  0)){
        return 0;
    }
    else if(str === 100 || str === -100){
        let num = Number(str);
        return num.toFixed(0);
    }
    else if((str >= 99.9 && str < 100) || (str <= -99.9 && str > -100) ){
        let num = Number(str);
        return num.toFixed(0);
    }
    else if(str === " ")
        return " ";
    else
        return str;
}

export function typeOf(value) {
    if (isNaN(value)) {
        return 'NaN';
    }
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}