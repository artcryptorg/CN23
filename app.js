'use strict'

const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

const pdfPath = './CN23_first_page.pdf';

const dataSender = [{ name: 'Vladimir Lenin', street: 'Blumen Strasse', zipcode: '14300', city: 'Zurich', country: 'Switzerland' }]
const dataRecipient = [{ name: 'Lev Trozki', street: 'Lupen 36', zipcode: '34021', city: 'Paris', country: 'France' }]

async function addTextToPDF(pdfPath, outputPath, objSender, name, street, zipcode, city, country) {
    // read PDF as bit 
    const pdfBytes = await fs.promises.readFile(pdfPath);
    // load PDF document
    const pdfDoc = await PDFDocument.load(pdfBytes);
    // first page from pdf document
    const page = pdfDoc.getPages()[0];
    // section of sender
    page.drawText(objSender.name, {
        x: 120,
        y: 408,
        size: 12,
        color: rgb(0, 0, 0),
    });
    page.drawText(objSender.street, {
        x: 102,
        y: 378,
        size: 10,
        color: rgb(0, 0, 0),
    });
    page.drawText(objSender.zipcode, {
        x: 137,
        y: 362,
        size: 10,
        color: rgb(0, 0, 0),
    });
    page.drawText(objSender.city, {
        x: 245,
        y: 362,
        size: 10,
        color: rgb(0, 0, 0),
    });
    page.drawText(objSender.country, {
        x: 114,
        y: 350,
        size: 10,
        color: rgb(0, 0, 0),
    });

    // section of recipient
    page.drawText(name, {
        x: 120,
        y: 334,
        size: 12,
        color: rgb(0, 0, 0),
    });
    page.drawText(street, {
        x: 102,
        y: 302,
        size: 10,
        color: rgb(0, 0, 0),
    });
    page.drawText(zipcode, {
        x: 137,
        y: 288,
        size: 10,
        color: rgb(0, 0, 0),
    });
    page.drawText(city, {
        x: 245,
        y: 288,
        size: 10,
        color: rgb(0, 0, 0),
    });
    page.drawText(country, {
        x: 114,
        y: 274,
        size: 10,
        color: rgb(0, 0, 0),
    });

    // section date
    page.drawText(new Date().toLocaleDateString(), {
        x: 400,
        y: 50,
        size: 12,
        color: rgb(0, 0, 0),
    });
    // section gift
    page.drawText('X', {
        x: 74,
        y: 146,
        size: 10,
        color: rgb(0, 0, 0),
    });
    // section contents

    // section price

    // save PDF
    const modifiedPdfBytes = await pdfDoc.save();
    await fs.promises.writeFile(outputPath, modifiedPdfBytes);
}


// const outputPath = './dist/new.pdf';
// addTextToPDF(pdfPath, outputPath, dataSender[0], data[0].name, data[0].street, data[0].zipcode, data[0].city, data[0].country)
//     .then(() => console.log('Текст успешно добавлен в PDF'))
//     .catch((err) => console.log('Произошла ошибка:', err));

dataRecipient.forEach((recipient, index) => {
    let outputPath = `./dist/new${index}.pdf`;
    addTextToPDF(pdfPath, outputPath, dataSender[0], recipient.name, recipient.street, recipient.zipcode, recipient.city, recipient.country)
        .then(() => console.log(`Текст для ${recipient.name} успешно добавлен в PDF`))
        .catch((err) => console.log('Произошла ошибка:', err));
});
