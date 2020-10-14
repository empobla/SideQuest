const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
 
// This should be a Uint8Array or ArrayBuffer
// This data can be obtained in a number of different ways
// If your running in a Node environment, you could use fs.readFile()
// In the browser, you could make a fetch() call and use res.arrayBuffer()

exports.pdf = async (req, res, next) => {
    try {
        const url = './public/images/charactersheet/charactersheet.pdf';
        const existingPdfBytes = fs.readFileSync(url);

        /// TO TEST ///
        // const charCodes = [91,111,98,106,101,99,116,32,80,114,111,109,105,115,101,93]
        // const str = charCodes.map(code => String.fromCharCode(code)).join('')
        // console.log(str)

        // console.log('Type:', typeof(existingPdfBytes));
        // console.log('Is Uint8Array:', existingPdfBytes instanceof Uint8Array);
        // console.log('Is ArrayBuffer:', existingPdfBytes instanceof ArrayBuffer);
        // console.log('Head:', String(existingPdfBytes.subarray(0, 250)));

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        
        // Embed the Helvetica font
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
        
        // Get the first page of the document
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        
        // Get the width and height of the first page
        const { width, height } = firstPage.getSize()
        
        // Draw a string of text diagonally across the first page
        firstPage.drawText('This text was added with JavaScript!', {
            x: 5,
            y: height / 2 + 300,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            rotate: degrees(-45),
        })
        
        // Serialize the PDFDocument to bytes (a Uint8Array)
        const pdfBytes = await pdfDoc.save();
        var pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');

        res.status(200);
        res.type('pdf');
        res.send(pdfBuffer);
        
        // For example, `pdfBytes` can be:
        //   • Written to a file in Node
        //   • Downloaded from the browser
        //   • Rendered in an <iframe>
    } catch(error) {
        next(error);
    }
}