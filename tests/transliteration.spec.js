import { test, expect } from '@playwright/test';

const scenarios = [
    // Renumbered to start from 0004 to follow assignment rules
    { id: 'Pos_Fun_0001', input: 'mama heta udheeta satahana liyannam.' },
    { id: 'Pos_Fun_0002', input: 'godak havas velaa nisaa api ikmanata vaeda ivara kalaa' },
    { id: 'Pos_Fun_0003', input: 'ov ehema venna puluvan, api vena vidhihak balamu' },
    { id: 'Pos_Fun_0004', input: 'aapahu kiyanna puluvandha?' },
    { id: 'Pos_Fun_0005', input: 'mama kiyana dhee ahanna.' },
    { id: 'Pos_Fun_0006', input: 'mama labana maase rata yanavaa.' },
    { id: 'Pos_Fun_0007', input: 'mama paenirasa kanna kaemathi naee' },
    { id: 'Pos_Fun_0008', input: 'suba udhaeesanak!.' },
    { id: 'Pos_Fun_0009', input: 'mama enakan innako.' },
    { id: 'Pos_Fun_0010', input: 'hari mama eeka kalaa' },
    { id: 'Pos_Fun_0011', input: 'mama heta nivadu thibunoth assignment eka karanavaa, iitapasse podi gamanak thiyanava gihin aevith havasata film ekak balanna kiyala thamayi hithaagena inne nam.  oyaa mokadha karanna hithaagena inne kiyala mata message ekak dhaalaa thiyanna.' },
    { id: 'Pos_Fun_0012', input: 'mama aavahama rs.500k dhennam. oyaata puluvandha  phone ekata data package ekak dhaanna. google map eka open karaganna vidhihak naee data ivara vela nisaa. mama hatton valata yanna paara dhanne naee eekayi.' },
    { id: 'Pos_Fun_0013', input: '2026.02.07 venidhaa api kattiya trip ekak yanna plan karala thiyenne. ee gaena vaedi visthara mama oyaata call ekak hari whatsapp message ekak dhaalaa hari kiyannam. train ekee thamayi kattiya yanna kaemathi.' },
    { id: 'Pos_Fun_0014', input: 'mama gee as karannam.             oyaata puluvandha paint karanna.' },
    { id: 'Pos_Fun_0015', input: 'oyaata puluvan nam 8.15a.m venakota campus ekata enavadha.' },
    { id: 'Pos_Fun_0016', input: 'thava 3km vagee issarahata gihaama akkalage gedhara hambenavaa. car eka gedharatama ganna puluvan nisaa apita payin yanna oone naee..' },
    { id: 'Pos_Fun_0017', input: 'mama udhee office ekata yanna kalin kiyannam. mata OTP eka balala kiyanna .' },
    { id: 'Pos_Fun_0018', input: 'email vala issue ekak thiyana nisaa SMS ekak yavanna. mathak karala oona karana details okkoma dhaanna' },
    { id: 'Pos_Fun_0019', input: 'adoo mata uBAta thank karannath baeri unaane.' },
    { id: 'Pos_Fun_0020', input: 'corona kaale maru aathal ekak gaththa needha api  ' },
    { id: 'Pos_Fun_0021', input: 'Invalid input. Please try again/ An error occurred. Please try again later/ Something went wrong/ Operation failed/ Unable to process request. meevaa saamaanYAyen ena error messages tikak ee nisaa eevaa fix karanna dhaenagena inna' },
    { id: 'Pos_Fun_0022', input: 'magee convocation eka venakota eyaa AL liyala ivara velaa iDHiivi.' },
    { id: 'Pos_Fun_0023', input: 'CCTV check karanna poliisiyen enava kiyala kiyanna kivvaa' },
    { id: 'Pos_Fun_0024', input: 'hari hari eeka mama balala labana sathiya venna kalin sure ekatama kiyannam machan.' },

    // Negative cases
    { id: 'Neg_Fun_0001', input: 'matamusicalekabalannayannaoone.' },
    { id: 'Neg_Fun_0002', input: 'aaye kavadhaavath eeka karanna EPAa' },
    { id: 'Neg_Fun_0003', input: 'BLOoD mOON bAeLuvADA.' },
    { id: 'Neg_Fun_0004', input: 'ammatasiri ehenam 5229 edha ata setvemu nedha?' },
    { id: 'Neg_Fun_0005', input: 'behe5h t i k a k ganna ya#%nna' },
    { id: 'Neg_Fun_0006', input: 'raa welaa mehen pitat wenawa' },
    { id: 'Neg_Fun_0007', input: 'man 1 veni potha liyala iVARa una' },
    { id: 'Neg_Fun_0008', input: 'apita kavdhri hariyai' },
    { id: 'Neg_Fun_0009', input: 'apoo eeka n6am epa wenava aaa' },
    { id: 'Neg_Fun_0010', input: 'Rs.100k d%iilaa ticket ekk ganavadha?' },
];

test.describe('SwiftTranslator Automation', () => {

    test.setTimeout(180000); // 3 minutes total timeout

    for (const data of scenarios) {
        test(`Test Case ${data.id}`, async ({ page }) => {
            // FIX 1: Use domcontentloaded to avoid waiting for slow ads
            await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });

            const inputField = page.locator('textarea').first();
            await inputField.waitFor({ state: 'visible' });
            
            // FIX 2: Use pressSequentially instead of fill to trigger Sinhala conversion
            await inputField.pressSequentially(data.input, { delay: 15 });

            // Wait for conversion
            await page.waitForTimeout(4000); 
            
            const outputField = page.locator('textarea').last();
            const actualOutput = await outputField.inputValue();

            console.log(`\n-----------------------------------`);
            console.log(`TC ID: ${data.id}`);
            console.log(`RESULT: ${actualOutput}`);
            console.log(`-----------------------------------`);
            
            expect(actualOutput.length).toBeGreaterThan(0);
        });
    }

    // FIX 3: Renamed to Pos_UI_0002 to avoid sample overlap
    test('Pos_UI_0001: Output clears when input is deleted', async ({ page }) => {
        await page.goto('https://www.swifttranslator.com/', { waitUntil: 'domcontentloaded' });
        const inputField = page.locator('textarea').first();
        const outputField = page.locator('textarea').last();
        
        await inputField.fill('Testing Update');
        await page.waitForTimeout(2000);
        await inputField.fill('');
        await page.waitForTimeout(2000);
        
        const output = await outputField.inputValue();
        expect(output).toBe('');
    });
});