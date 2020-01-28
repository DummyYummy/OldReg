var Client = require('instagram-private-api').V1,
         _ = require('underscore'),
PhoneLib = require('./onlineSimRequest');


createNew();

async function createNew(user, pass) {
    //_createNewSession();
    // TMP for Create empty session
    var device = new Client.Device('Iphone');
    var storage = new Client.CookieFileStorage('./cookies/test.json');
    var session = new Client.Session(device, storage);
    var phone = await PhoneLib.getNewPhone();
    var b = 1;
    // new Client.AccountEmailCreator(session)
	// .setEmail('NagliyHeralsdf8231@hotmail.com')
	// .setUsername('NagliyHelrasdf82')
	// .setPassword('Adfklafirwu1414')
	// .setName('Nagliy')
	// .register()
	// .spread(function(account, discover) {
	// 	// account instanceof Client.Account
	// 	console.log("Created Account", account)
	// 	console.log("Discovery Feed", discover);
	// }).catch(function(err){
    //     var a = 1;
    // })
    new Client.AccountPhoneCreator(session)
        .setPhone(phone)
        .setUsername('BaristaNahKovachwer4')
        .setPassword('Generald92341')
        .setName('Ladicdkich')
        .setPhoneCallback(function() {
            // This will be called in order to 
            // supply verification code, must return promise
            // with actual value
            var code;
            var a = 1; 
            return Promise.resolve(code)
        })
        .register()
        .spread(function(account, discover) {
            // account instanceof Client.Account
            console.log("Created Account", account)
            console.log("Discovery Feed", discover);
        }).catch(function(err){
                var a = 1;
            })

}

async function _fillNewAccount(oSession) {

    // await Client.Account.setProfilePicture(oSession, './img/Test/avatar.jpg');
    // await Client.Account.editProfile(oSession, {
    //      //externalUrl: "https://clck.ru/FMzi5",
    //      first_name: "Best Web Models",
    //      biography: "🔻🔻🔻🔻🔻🔻🔻🔻"
    //  });
    //  setTimeout(async function(){
    //     await uploadPhotos(oSession, 9);
    //  }, 10000);

    _getStories('znakomstva_voronezh', oSession);


}


async function uploadPhotos(oSession, count) {

    return new Promise(function (resolve) {
        let sPath = './img/Test/photo' + count + '.jpg';
        Client.Upload.photo(oSession, sPath)
            .then(async function (upload) {
                let sDescription = await _getRandomDescription();
                return Client.Media.configurePhoto(oSession, upload.params.uploadId, sDescription);
            })
            .then(function (medium) {
                count++;
                if (count < 10)
                    setTimeout(function () {
                        uploadPhotos(oSession, count).then(function(test1, test2){
                            var a = 1; 
                        });
                    }, 5000)
                else 
                    resolve("dummy");
            })
    });
}


async function _getRandomDescription(){
    //TMP rewrite using DB

    var arr1 = ['link in bio', 'check out my bio for more', 'link in my profile', 'check out link in bio for more', 'Me and 1000 other girls are online. Check link in bio'];

    var description = arr1[Math.floor(Math.random() * 5)];
    return description;
}

async function _getStories(sTargetUserName, oSession){
    Client.Account.searchForUser(oSession, sTargetUserName).then(async function(account){
        if (!account.id){
            return;
        }
        
        var feed = new Client.Feed.UserStoryFeed(oSession, [account.id.toString()]);
        var results = await feed.get();
        var arrStories = _.flatten(results);

        var a = 1;
    });
}


//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------
//---------------------------------------------------------------------------


// function start(sMyGroup, device, storage){
    
//   var sPass = getPassword(sMyGroup);  
//   var sMediaSendId;
//   var sGroupName = getGroupName(sMyGroup);
//   var arrReserve, sDMGroupName, arrDM,
//       sReserveGroupName = sGroupName;   
  
//   while (sReserveGroupName === sGroupName){
//     sReserveGroupName = getGroupName(sMyGroup);
//   };
    
//   //sDMGroupName = getDMGroupName(sMyGroup);
    
//   Client.Session.create(device, storage, sMyGroup, sPass)
//     .then(function(session) {
        
//         return [session, Client.Account.searchForUser(session, sGroupName), Client.Account.searchForUser(session, sReserveGroupName),
//                          Client.Account.searchForUser(session, sMyGroup)]  
        
//     })
//     .spread(function(session, account, accountReserve, accountDM, accountMe) {
        
//         var sLogString1 = sMyGroup + '--->' + sGroupName ;
//         var sLogString2 = 'Reserve ---> ' + sReserveGroupName;
//         var sLogString3 = 'DM Send --->' + sDMGroupName;
        
        
//         //reserve only for likes 
//         var arrReserve;
//         var feedReserve = new Client.Feed.UserMedia(session, accountReserve.id);
//         feedReserve.get().then(function(resultsRes){
//             Client.Media.likers(session, resultsRes[5].id).then(function(resultsRes, accountReserve){
//                 // delete users who already got a request
//                 var deprecUsers = getDeprecUsers(sMyGroup);
//                 var userInArray, newUsers = [];
                
//                 sLogString2 += ' inital = ' + resultsRes.length;
                
//                 resultsRes.forEach(function(item,i,array){
//                     userInArray = deprecUsers.indexOf(item.id);
                    
//                     if (userInArray === -1 && !item._params.isPrivate){
//                         newUsers.push(item);
//                     } 
//                 });
//                 arrReserve = newUsers;
//                 sLogString2 += ' final = ' + arrReserve.length;
//             });
//             // New Logic <----
            
//         });
        
//         var feed = new Client.Feed.UserMedia(session, account.id);
        
//         // get list of likers for third post in group
//         feed.get().then(function(results){ 
//             Client.Media.likers(session, results[5].id).then(function(results, account){
                
//                 sLogString1 += ' intial = ' + results.length;
              
//                 // delete users who already got a request
//                 var userInArray, newUsers = [];
//                 var deprecUsers = getDeprecUsers(sMyGroup);
//                 results.forEach(function(item,i,array){
//                     userInArray = deprecUsers.indexOf(item.id);
//                     // if user is not in array, then try to follow him
//                     if (userInArray === -1){
//                         newUsers.push(item);
//                     } 
//                 });
//                 results = newUsers;
                
//                 sLogString1 += ' final = ' + results.length;
//                 console.log(sLogString1);   
//                 console.log(sLogString2);
//                 console.log(sLogString3);
              
//                 // workaround for make a loop by all users and send invitation request with a delay 
//                 // 62 seconds 
//                 var i = 0;
//                 (function loop(){
//                     if (i++ > results.length - 3){
//                       start(sMyGroup, device, storage);    
//                       return;
//                     } 
//                     setTimeout(function(){
//                       tryToFollow(session, results[i], sMyGroup, i, arrReserve);
                      
//                       if (i % 4 === 0 && i <= 240){
//                         //tryToSendDM(sMediaSendId,session,arrDM, sMyGroup);
//                       }
                      
//                       loop();
//                     }, 115000)})();
                
//                 //tryToFollow(session, results[0]);
                
//             });
//         });  
//     });      
// };

// ar sCurrUsr    
// function tryToFollow(session, account, sMyGroup, count, arrReserve){
    
//     var deprecUsers = getDeprecUsers(sMyGroup),
//         likedId;
    
//     var userInArray = deprecUsers.indexOf(account.id);
//     // if user is not in array, then try to follow him
//     if (userInArray === -1){
        
//       sCurrUsr = account._params.username;
//       var Relat = Client.Relationship.create(session, account.id); 
//       Relat.then(function(relat) {
           
//           // log
//           console.log(sMyGroup + " is now folowing " + sCurrUsr + "(Att. " + count + ")");
           
//           // if account is not private then try to like the last record
//           if (!relat.params.is_private){
//               tryToLike(session,  account.id, arrReserve, sMyGroup, deprecUsers);
//           } else {
//               tryToLikeReserve(session, arrReserve, deprecUsers, sMyGroup);
//           }
//       })
       
//         //add user to the list 
//       deprecUsers.push(account.id);

//       // save users 
//       saveDeprecUsers(deprecUsers, sMyGroup);
      
//     } else {
//       console.log('User' + account._params.username + 'was skipped');
//     }
// }

// function tryToLike(session, accountId, arrReserve, sMyGroup, deprecUsers){
//     var mediaFeed = new Client.Feed.UserMedia(session, accountId);
//     mediaFeed.get().then(function(results){ 
//         // if at least one photo exist try to set the like 
//         if (results.length > 0) {
//             setTimeout(function(){
//                 Client.Like.create(session, results[0].id);
//                // console.log(results[0]);
//                 console.log(sMyGroup + ' Like was Set');
//             }, 1000); //set like in 1 second after follow
//         } else {
//             // id of user with additiaonl like
//             return tryToLikeReserve(session, arrReserve, deprecUsers, sMyGroup);
//         }
        
//     })
// }

// function tryToLikeReserve(session, arrReserve, deprecUsers, sMyGroup){
    
//     var accountRes = arrReserve[0];
    
//     // remove this user from array
//     arrReserve.splice(0, 1);
    
//     var mediaFeed = new Client.Feed.UserMedia(session, accountRes.id);
//     mediaFeed.get().then(function(results){ 
//         // if at least one photo exist try to set the like 
//         if (results.length > 0) {
//             setTimeout(function(){
//                 Client.Like.create(session, results[0].id);
                
//                 var deprecUsers = getDeprecUsers(sMyGroup);
//                 deprecUsers.push(accountRes.id);
//                 console.log(sMyGroup + ' Like was Set (Reserve user ' + accountRes._params.username + ' )');
//                 saveDeprecUsers(deprecUsers, sMyGroup);
//             }, 2000); //set like in 1 second after follow
//         } else {
//             tryToLikeReserve(session, arrReserve, deprecUsers, sMyGroup)
//         }

//     })
// }

// // write reponse html
// function writeResponse (sGroupName, response){
    
//   var body = '<html>'+
// 	'<head>'+
// 	'<meta http-equiv="Content-Type" '+
// 	'content="text/html; charset=UTF-8" />'+
// 	'</head>'+
// 	'<body>'+
// 	'<p>Bot for <strong>' + sGroupName + '</strong> was started</p>'+
// 	'</body>'+
// 	'</html>';

// 	response.writeHead(200, {"Content-Type": "text/html"});
// 	response.write(body);
// 	response.end();
// }

// // get group for followers
// function getGroupName(sMyGroup){
    
//     // groups for followers 
//     var arrSameGroups;
//     switch (sMyGroup) {
//         case 'real.russian.girls':
//             arrSameGroups = ['angels_russia', 'insta_clabbery', 'faprussia', 'angels_russian', 'vpiskarus']; //'figurka.vdk', 'krd_lady',
//             break;
//         case 'world.best.hotties':
//             arrSameGroups = [ 'bossgirlscertified','instahottiesworldwide','hot_babe_united', 'angels_russian', 'vpiskarus'];
//             break;
//         case 'insta__anonymous':
//             arrSameGroups = ['kudryashnutrition', 'nastenabalinskaya', 'irenabendida', 'roman.kapa', 'romangritsenko13' ]; 
//             break;
//         case 'anon_insta_tools':
//             arrSameGroups = ['justinbieber', 'kimkardashian', 'nfl']; 
//             break;
//         case 'banana_lady':
//             arrSameGroups = ['babys.sensuales', 'latinasbellas.1', 'sexyjessej' ]; 
//             break;
//         case 'lollipop_hot_lady':
//             arrSameGroups = ['angels_russia', 'karma.rx' ]; 
//             break;
//         case 'hotties_around':
//             arrSameGroups = ['karma.rx', 'anya.sugar', 'viki_odintcova', 'galina_dub', 'angels_russian', 'yle4ka_001']; 
//             break;
//         case 'znakomstva_voronezh':
//             arrSameGroups = ['typical_vrn', 'voronezh_gorod', 'voronezh_info', 'voronezhgorod']; 
//             break;
//         case 'top_sex_webcam':
//             arrSameGroups = ['xvideoshoot', 'pornhub', 'anfamans']; 
//             break;
//         case 'best_girls_anywhere':
//             arrSameGroups = ['brazzersofficial', 'lolataylor2', 'eva_berger_official']; 
//             break;
//         case 'woow_that_girl':
//             arrSameGroups = ['martina3._', 'nikkibenz', 'camsoda']; 
//             break;
//         default: 
//             arrSameGroups = ['angels_russia', 'faprussia', 'angels_russian', 'vpiskarus', 'vpiska_hype',
//                             'krd.lady', 'khv_lady', 'khv.top', 'poshlye__russian', 'poshlye_video', 'vdk_lady',
//                             'rus_criminal', 'vpiska_show', 'shurygina_diana555']; //'figurka.vdk', 'krd_lady',
//             break;
//     }
    
//     // get group name
//     return arrSameGroups[Math.floor(Math.random()*arrSameGroups.length)]
    
// }

// // get group for name
// function getDMGroupName(sMyGroup){
    
//     // groups for followers 
//     var arrSameGroups;
//     switch (sMyGroup) {
//         case 'real.russian.girls':
//             arrSameGroups = ['bossgirlscertified','instahottiesworldwide','hot_babe_united']; //'figurka.vdk', 'krd_lady',
//             break;
//         case 'world.best.hotties':
//             arrSameGroups = [ 'hot.mommas'];
//             break;
//     }
    
//     // get group name
//     return arrSameGroups[Math.floor(Math.random()*arrSameGroups.length)];
    
// }

// function tryToSendDM(mediaId, session, arrForDM, sMyGroup){
   
//     var arrUsers = [];
    
//     for (var i=0; i<5; i++){
//         var account = arrForDM[0].id;
//         arrUsers.push(account);
//         // remove this user from array
//         arrForDM.splice(0, 1);
//     }
    
//     setTimeout(function(){
        
//                 var sMessage = getMessageText();
//                 Client.Thread.configureMediaShare(session, arrUsers, mediaId, sMessage);
                
//                 var deprecUsers = getDeprecUsers(sMyGroup);
//                 for (var j=0; j<5; j++){
//                    deprecUsers.push(arrUsers[j].id);
//                 }
//                 deprecUsers.push(account);
//                 console.log(sMyGroup + ' Direct Message was end to 5 users.');
//                 saveDeprecUsers(deprecUsers, sMyGroup);
                
//             }, 10000);
// }

// //get message text
// function getMessageText(){
//     var sText;
   
//     var sPart1, sPart2, sPart3, sPart4,
//         arr1, arr2, arr3, arr4;
   
//     arr1 = ['Hi,', 'Hi!', 'Hey!', 'Hello,', 'Hi there!', 'Nice to meet you,', 'Hey, how are you doing?'];
//     arr2 = ['Check my account for more', 'Look for more in my account', 'Visit my account for more', 'See more in my account'];
//     arr3 = ['😘','🔥','😚','😉','😙','😜'];
    
//     sText = arr1[Math.floor(Math.random()*arr1.length)] + ' ' + arr2[Math.floor(Math.random()*arr2.length)] + ' ' +
//             arr3[Math.floor(Math.random()*arr3.length)];
    
//     return sText;
// }

// // get array of deprecated users
// function getDeprecUsers(sMyGroup){
//     // users, my followers or users to whom request was already sent 
//     var deprecUsers = [], sFileName,
//     accFollowersFeed, err, contents; 

//     switch (sMyGroup){
//         case 'real.russian.girls' :
//             sFileName = "./Files/users.json";
//             break;
//         case 'world.best.hotties' :
//             sFileName = './Files/users2.json';
//             break;
//         case 'insta__anonymous' :
//             sFileName = './Files/usersForAnon.json';
//             break;
//         case 'anon_insta_tools' :
//             sFileName = './Files/usersForAnonEn.json';
//             break;
//         case 'banana_lady' :
//             sFileName = './Files/banana_hottie.json';
//             break;
//         case 'lollipop_hot_lady' :
//             sFileName = './Files/lollipop_top_lady.json';
//             break;
//         case 'hotties_around' :
//             sFileName = './Files/hotties_around.json';
//             break;
//         case 'znakomstva_voronezh' :
//             sFileName = './Files/znakomstva_voronezh.json';
//             break;
//         case 'top_sex_webcam' :
//             sFileName = './Files/top_sex_webcam.json';
//             break;
//         case 'best_girls_anywhere' :
//             sFileName = './Files/best_girls_anywhere.json';
//             break;
//         case 'woow_that_girl' :
//             sFileName = './Files/woow_that_girl.json';
//             break;
//         default:
//             sFileName = './Files/usersForTelegram.json';
//             break;
//     }
    
//     deprecUsers = JSON.parse(fs. readFileSync(sFileName, 'utf8', function(err, contents) {
//       //  console.log(contents);
//       //  deprecUsers = JSON.parse(contents);
//     }));
//     return deprecUsers;
// }

// //save users who got an invitation
// function saveDeprecUsers(deprecUsers, sMyGroup){
    
//     var sFileName, err;
//     switch (sMyGroup){
//         case 'real.russian.girls' :
//             sFileName = './Files/users.json';
//             break;
//         case 'world.best.hotties' :
//             sFileName = './Files/users2.json';
//             break;
//         case 'insta__anonymous' :
//             sFileName = './Files/usersForAnon.json';
//             break;
//         case 'anon_insta_tools' :
//             sFileName = './Files/usersForAnonEn.json';
//             break;
//         case 'banana_lady' :
//             sFileName = './Files/banana_hottie.json';
//             break;    
//         case 'lollipop_hot_lady' :
//             sFileName = './Files/lollipop_top_lady.json';
//             break;
//         case 'hotties_around' :
//             sFileName = './Files/hotties_around.json';
//             break;
//         case 'znakomstva_voronezh' :
//             sFileName = './Files/znakomstva_voronezh.json';
//             break;
//         case 'top_sex_webcam' :
//             sFileName = './Files/top_sex_webcam.json';
//             break;
//         case 'best_girls_anywhere' :
//             sFileName = './Files/best_girls_anywhere.json';
//             break;
//         case 'woow_that_girl' :
//             sFileName = './Files/woow_that_girl.json';
//             break;
//         default: 
//             sFileName = './Files/usersForTelegram.json';
//             break;
//     }
    
//     fs.writeFile(sFileName, JSON.stringify(deprecUsers), function(err) {
//         if(err) {
//             return console.log(err);
//         }
//     });
// }

// function getPassword(sMyGroup){
//     switch (sMyGroup){
//         case 'Telkobaza':
//             return 'TelkobazaRep811Bavaria';
//         case 'world.best.hotties':
//             return 'HotRep811Hotties';
//         case 'insta__anonymous':
//             return 'Priora811';
//         case 'anon_insta_tools':
//             return 'Priora811';
//         case 'banana_lady':
//             return 'BananaGirlsInst811';
//         case 'lollipop_hot_lady':
//             return 'Priora811';
//         case 'hotties_around':
//             return 'HottestLocalGirls811';
//         case 'znakomstva_voronezh':
//             return 'Priora811';
//         case 'top_sex_webcam':
//             return 'BongaRef811';
//         case 'best_girls_anywhere':
//             return 'BongaRef811';
//         case 'woow_that_girl':
//             return 'BongaRef811';
//         default: 
//             return 'Telkobaza811Priora'
//     }
// }