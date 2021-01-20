import * as os from 'os'
import * as playwright from 'playwright-core'

/**
 * Connection POC
 * 
 * With the create-react-app running, this test launches the OpenFin runtime,
 * connects playwright to it, and takes a screenshot of the window
 * 
 * This POC assumes you have the OpenFin runtime locally
 */

const executablePath = `${os.homedir()}\\AppData\\Local\\OpenFin\\runtime\\17.85.53.10\\OpenFin\\openfin.exe`;
const args = [ '--config=http://localhost:3000/app.json'];

(async () => {
    try {
        const browserServer = await playwright.chromium.launchServer({ executablePath, args });
        const wsEndpoint = browserServer.wsEndpoint();
        const browser = await playwright.chromium.connect({ wsEndpoint })
        const page = await browser.newPage()
        await page.goto('http://localhost:3000/')
        await page.screenshot({ path: 'screenshots/openfin.png'});
        browserServer.close()
    } catch (e) {
        console.log(`ERROR: ${e}`)
    }
})()