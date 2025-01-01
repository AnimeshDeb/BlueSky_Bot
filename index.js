import puppeteer from 'puppeteer';
import dotenv from 'dotenv'
import {createWorker} from 'tesseract.js'
import path from 'path'


//Account creation 

(async () => {
  
dotenv.config()
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({headless:false});
  const page = await browser.newPage();
  // Set screen size
  await page.setViewport({width: 1080, height: 1024});
  const email=process.env.EMAIL 
  const password=process.env.PASSWORD
  const username=process.env.END_USERNAME
  // Navigate the page to a URL
await page.goto('https://bsky.app/settings');
  // 'button' is a CSS selector.
await page.locator('.r-1otgn73').click();//making a new account

await page.locator('.r-6taxm2').click()//clicking input box
// Type into the input box
await page.type('.r-6taxm2', `${email}`, { delay: 100 }); 

//another way of selecting fields, this one needs attributes
await page.waitForSelector('[data-testid="passwordInput"]')
await page.type('[data-testid="passwordInput"]', `${password}`, {delay:130})
await page.waitForSelector('[data-testid="nextBtn"]')
await page.click('[data-testid="nextBtn"]')
await page.waitForSelector('[data-testid="handleInput"]')
await page.type('[data-testid="handleInput"]', `${username}`, {delay: 120} )


await page.waitForSelector('[data-testid="nextBtn"]')
await page.click('[data-testid="nextBtn"]')
try{
  await page.waitForSelector('.css-146c3p1', {timeout:5000} )
  await page.screenshot({
    path:"./ss.png",
  })
 
  const imagepath='.ss.png'
  Tesseract.recognize(
    imagepath,
    'eng',
    {logger:m=>console.log(m)}
  )
  .then(({data:{text}})=>{
    console.log(text)
  });
}
catch(error){

}



})();