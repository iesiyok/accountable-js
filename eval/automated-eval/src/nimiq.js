
const helper = require('./helper.js');

module.exports.createUserData = async (page) => {


    await page.goto(helper.nimiqHub);

    await helper.sleep(2000);

    await page.evaluate( () => {
      let radio = document.querySelector('[name="popup-vs-redirect"][value="redirect"]')
      radio.click();
      let create = document.querySelector("#create");
      create.click();

    });
    await helper.sleep(1500);

    await page.evaluate( () => {
      
      let icons = document.querySelector(".identicon");
      icons.click();
    });

    await helper.sleep(1500);

    await page.evaluate(() => {

      let icon = document.querySelector(".confirm-address");
      icon.click();
    });

    await helper.sleep(500);

    await page.$eval('.password', el => el.value = 'n2d0s2s2');

    await helper.sleep(500);

    await page.evaluate(() => {

      let submit = document.querySelector('[data-i18n="passwordbox-repeat"]');
      submit.click();
    });
    await helper.sleep(100);

    await page.$eval('.password', el => el.value = 'n2d0s2s2');


    await page.evaluate(() => {

      let submit = document.querySelector('[data-i18n="passwordbox-confirm-create"]');
      submit.click();
    });
    await helper.sleep(100);
    await page.evaluate(() => {

      let icon = document.querySelector(".download-button");
      icon.click();
    });

    await helper.sleep(1500);

    await page.evaluate(() => {

      document.querySelector(".nq-button.light-blue.continue").click();

    });

    await helper.sleep(3500);

}


