const axios = require("axios");

function createNewPhoneNumber() {
      return new Promise(function (resolve, reject) {
            var settings = {
                  "async": true,
                  "crossDomain": true,
                  "url": "https://onlinesim.ru/api/getNum.php?apikey=ab383333c1912b2c244e8c6c4e8aa371&service=Instagram&country=7",
                  //"url": "https://onlinesim.ru/api/getNum.php?apikey=ab383333c1912b2c244e8c6c4e8aa371&service=Telegram&country=380",
                  //"url": "https://onlinesim.ru/api/getNum.php?apikey=ab383333c1912b2c244e8c6c4e8aa371&service=youla&country=7",
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
      // return new Promise(function (resolve, reject) {
      //       resolve('10740231');
      // });
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
                                    resolve({ response: response.data[0].response, msg: lastMessage.msg, count: response.data[0].msg.length  });
                              }
                        }
                        else
                              reject(response.data.response);
                  })
      });

}


// exports.waitAndResolve = async function (tzid) {
//       return new Promise(function (resolve, reject) {
//             getByRequest(tzid, 'Response').then(function (response) {
//                   if (response.response !== "TZ_NUM_WAIT" && response.count > global.msgCount) 
//                         resolve(response.msg);
//                   else {
//                         setTimeout(function () {
//                               waitAndResolve(tzid);
//                         }, 3000);
//                   }
//             })
//       });
// }

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