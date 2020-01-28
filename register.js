
const { Builder, By, Key, until } = require('selenium-webdriver');


exports.registerViaWeb = async function (phone) {
        let driver = await new Builder().forBrowser('safari').build();
        try {
            await driver.get("https://instagram.com");
            let email;
            while (!email) {
                try {
                    email = await driver.findElement(By.name('emailOrPhone'));
                } catch (err) { }
            }
            var sEmail = _createNewEmail();
            await email.sendKeys(sEmail);

            //var sUsername = _createUserName();
            var sUsername = 'porilbbmolv.vlad12h3';
            var username = await driver.findElement(By.name('username'));
            await username.sendKeys(sUsername);

            var sPwd = _createPW();
            var password = await driver.findElement(By.name('password'));
            await password.sendKeys(sPwd);

            var regBtn = await driver.findElement(By.xpath('//*[@id="react-root"]/section/main/article/div[2]/div[1]/div/form/div[7]/div/button'));
            setTimeout(async function(){
                await regBtn.click();
                var a = 1;
            }, 5000)
            

            var a = 1;

            return {
                email: sEmail,
                username: sUsername,
                pwd: sPwd
            }

        } catch (err) {
            //await driver.quit();
            var a = 1;
        }
}

function _createNewEmail() {

    //TMP rewrite using DB

    var arr1 = ['dd_gfa', 'fd_gaf', 'afa_fr'];
    var arr2 = ['bogtn_r', 'fs_afa', 'asfaf_'];
    var arr3 = ['fasfas_', 'das_dada', 'pid_mq'];

    var email = arr1[Math.floor(Math.random() * 3)] + arr2[Math.floor(Math.random() * 3)] + arr3[Math.floor(Math.random() * 3)] + '@yandex.ru';
    console.log(email);
    return email;
}

function _createUserName() {

    //TMP rewrite using DB

    var arr1 = ['top', 'best', 'hot', "yummy", 'awesome'];
    var arr2 = ['_web_', '_nasty_', '_stunning_', "_sexy_", "_slutty_"];
    var arr3 = ['girls', 'ladies', 'hotties', 'models', 'babes'];

    var oName = arr1[Math.floor(Math.random() * 5)] + arr2[Math.floor(Math.random() * 5)] + arr3[Math.floor(Math.random() * 5)] + '__';
    console.log(oName);
    return oName;

}

function _createPW() {
    return 'tpkujnoiyg';
}

function _createName() {
    return 'Korny';
}