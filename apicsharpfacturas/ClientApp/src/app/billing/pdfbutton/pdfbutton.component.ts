import { Component, Input } from '@angular/core';

// ======== pdf library ========
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const pdfMake = require('pdfMake/build/pdfmake.js');
import { BillEntity } from 'src/app/models/BillEntity';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdfbutton',
  templateUrl: './pdfbutton.component.html',
  styleUrls: ['./pdfbutton.component.css']
})
export class PdfbuttonComponent {


  // data of bill got as input in this component
  @Input()
  public billData!: BillEntity;


  createPdf() {

    // body of  whole table
    var body: any[] = [];
    // var header
    var header =
      body.push(['Id Detalle', 'producto', 'modelo', 'V.unit', 'Cantidad', 'V.total']);


    if (this.billData.details) {

      for (var i = 0; this.billData.details.length > i; i++) {
        // create a new row
        let row = [];
        // if current element in the list of details exists
        if (this.billData.details[i]) {
          row.push(this.billData.details[i].id);
          row.push(this.billData.details[i].product?.name);
          row.push(this.billData.details[i].product?.model);
          row.push(this.billData.details[i].unitValue);
          row.push(this.billData.details[i].quantity);
          row.push(this.billData.details[i].totalValue);
          body.push(row);

          // push the new row to body ['', '', '', '', '', '']
          // body.push(row);

          /**
           * 
           * the above operation give the following output
           * 
           * body: [
           *  ['', '', '', '', '', ''],
           *  ['', '', '', '', '', ''],
           *  ['', '', '', '', '', ''],
           *  ['', '', '', '', '', '']
           * ]
          */

        }
      };
    }

    // configuration of the document file 
    var docDefinition = {
      pageMargins: [60, 40],

      content: [
        {
          text: "Detalles de Facturación.",
          fontSize: 18,
          bold: true,
          margin: [0, 20, 0, 20],
        },
        {
          columns: [
            [
              { text: [{ text: "Id Factura: ", bold: true }, this.billData.id], margins: [0, 20] },
              { text: [{ text: "Fecha de Registro: ", bold: true }, this.billData.date], margins: [0, 20]  },
            ],
            [
              { text: [{ text: "Apellidos: ", bold: true }, this.billData.client?.lastnames] },
              { text: [{ text: "Nombres: ",  bold: true }, this.billData.client?.names] }
            ],
          ],
        },
        { // this table have all the products a client has bought
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: body
          },
          margin: [20, 40]
        },
        { text: [{ text: "Sub-Total: ", bold: true, }, { text: this.billData.subTotal, margin: [0, 20] }] },
        { text: [ { text: "Discount: ", bold: true, }, { text: this.billData.discount, margin: [0, 10] } ] },
        { text: [ { text: "Total a Pagar: ", bold: true }, { text: this.billData.totalValue, margin: [0, 10] }, ] },

      ],
      defaultStyle: {
        fontSize: 15,
        columnGap: 20,
      },
    };

    const pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
  }

}
