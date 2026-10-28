const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function generate() {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const htmlPath = path.resolve(__dirname, '../Day-1-Backend-Database-Report.html');
  const pdfPath = path.resolve(__dirname, '../Day-1-Backend-Database-Report.pdf');
  const desktopPdfPath = 'C:\\Users\\glafi\\OneDrive\\Desktop\\Day-1-Backend-Database-Report.pdf';
  const previewPng = path.resolve(__dirname, 'pdf_rendered_preview.png');

  console.log('Launching Chrome via Puppeteer-core...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });

  const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');
  console.log('Navigating to:', fileUrl);
  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  // Take screenshot to visually confirm
  await page.screenshot({ path: previewPng, fullPage: true });
  console.log('Visual preview saved to:', previewPng);

  // Generate PDF
  console.log('Rendering PDF...');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true
  });

  // Copy to desktop
  fs.copyFileSync(pdfPath, desktopPdfPath);

  const pdfBuf = fs.readFileSync(pdfPath);
  const pdfStr = pdfBuf.toString('latin1');
  const pageCount = (pdfStr.match(/\/Type\s*\/Page\b/g) || []).length;
  console.log(`PDF successfully generated: ${pdfBuf.length} bytes, ${pageCount} page(s).`);

  await browser.close();
}

generate().catch(err => {
  console.error('Fatal error generating PDF:', err);
  process.exit(1);
});
