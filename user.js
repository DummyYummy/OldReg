var faker = require('faker');

exports.getRandomUser = function(gender){ // gender = 1 || 0
    // let emails = await axios({
    //     method: 'get',
    //     url: 'https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole'
    // });

    // return emails.data;

    var user = {}; 
    user.firstName = faker.name.firstName(gender); //1 - female; 0 - male 
    user.lastName = faker.name.lastName(gender) + Math.floor(Math.random() * Math.floor(99));;
    user.email = faker.internet.email(user.firstName, user.lastName);
    user.gender = gender;
    user.password = faker.internet.password();
    user.login = user.email.split("@")[0];

    return user;

}

//test()

async function test(){
    exports.getRandomUser(1);
}