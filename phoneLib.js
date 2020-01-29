const axios = require("axios");

const arrCountry = [40, 48, 371, 372, 373, 998, 375, 77, 380, 7];

async function getFreeCountry() {
    let oBestCountry = {};
    oBestCountry.price = 99;

    for (i in arrCountry) {
        let sUrl = "https://onlinesim.ru/api/getNumbersStats.php?apikey=ab383333c1912b2c244e8c6c4e8aa371&service=Instagram&country=" + arrCountry[i];
        var settings = {
            "async": false,
            "crossDomain": true,
            "url": sUrl,
            "method": "GET",
            "headers": {
                "accept": "application/json"
            }
        }
        var oResponse = await axios(settings);
        if (oResponse.data.services.instagram.count > 0)
            if (oResponse.data.services.instagram.count < oBestCountry.price) {
                oBestCountry.price = oResponse.data.services.instagram.price;
                oBestCountry.countryCode = arrCountry[i];
                oBestCountry.count = oResponse.data.services.instagram.count;
            }
    }

    return oBestCountry.countryCode;
}


function createNewPhoneNumber(countryCode) {
    return new Promise(async function (resolve, reject) {

        var sCountryCode = await getFreeCountry();
        var sUrl = "https://onlinesim.ru/api/getNum.php?apikey=ab383333c1912b2c244e8c6c4e8aa371&service=Instagram&country=" + sCountryCode;
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": sUrl,
            "method": "GET",
            "headers": {
                "accept": "application/json"
            }
        }
        axios(settings)
            .then(function (response) {
                // success
                if (response.data.response !== 'NO_NUMBER')
                    resolve(response.data.tzid)
                //error
                else
                    reject(response.data.response);
            })
            .catch(function (error) {

            })

    });
}

function getByRequest(reqId, sTarget) {

    return new Promise(function (resolve, reject) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://onlinesim.ru/api/getState.php?apikey=ab383333c1912b2c244e8c6c4e8aa371&msg_list=1&tzid=" + reqId,
            "method": "GET",
            "headers": {
                "accept": "application/json"
            }
        }

        axios(settings)
            .then(function (response) {
                if (response.data.response !== 'ERROR_NO_OPERATIONS') {
                    if (sTarget === 'Phone') {
                        resolve({ number: response.data[0].number, tzid: response.data[0].tzid });
                        if (response.data[0].msg)
                            global.msgCount = response.data[0].msg.length;
                        else
                            global.msgCount = 0;
                    }
                    else if (sTarget === 'Response' && response.data[0].msg) {
                        let lastMessage = response.data[0].msg[response.data[0].msg.length - 1];
                        resolve({ response: response.data[0].response, msg: lastMessage.msg, count: response.data[0].msg.length });
                    }
                }
                else
                    reject(response.data.response);
            })
    });

}

exports.getNewPhone = function () {
    return new Promise(function (resolve, reject) {
        createNewPhoneNumber().then(function (reqId) {
            getByRequest(reqId, 'Phone').then(function (phone) {
                resolve(phone);
            });
        });
    });
}

exports.getConfirmationCode = function (reqId) {
    return new Promise(function (resolve, reject) {
        getByRequest(reqId, 'Response').then(function (code) {
            resolve(code);
        });
    });
}

//exports.getNewPhone();