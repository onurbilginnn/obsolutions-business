import { saveAs } from "file-saver";
import {
  AlignmentType,
  Document,
  Media,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  BorderStyle,
  HeadingLevel,
  convertInchesToTwip
} from "docx";



const expoContractWord = (img = '', data, contractTableHeaders) => {
  const doc = new Document({
    styles: {
      default: {
        heading1: {
          run: {
            size: 28,
            bold: true,
            color: "black",
          }
        },
        heading3: {
          run: {
            size: 20,
            bold: true,
            color: "black",
          }
        },
      }
    }
  });
  const noBorder = {
    top: {
      style: BorderStyle.NONE,
    },
    bottom: {
      style: BorderStyle.NONE,
    },
    left: {
      style: BorderStyle.NONE,
    },
    right: {
      style: BorderStyle.NONE,
    }
  };
  
  const contractTableMargins = {
    top: convertInchesToTwip(0.1),
    bottom: convertInchesToTwip(0.1),
    left: convertInchesToTwip(0.1),
    right: convertInchesToTwip(0.1),
  };
  
  const createContractRowGrands = (subTotalName, subTotalAmount, textInNextCell = '') => {
    const row = new TableRow({
        children: [
      new TableCell({  
          children:[new Paragraph('')]      
      }),
      new TableCell({  
        children:[new Paragraph('')]     
      }),    
      new TableCell({  
        children:[new Paragraph({
         text: subTotalName,
         heading: HeadingLevel.HEADING_3
        })],
        margins: contractTableMargins   
      }),
      new TableCell({  
        children:[new Paragraph({
         text: textInNextCell.toString(),
         heading: HeadingLevel.HEADING_3
        })],
        margins: contractTableMargins     
      }),
      new TableCell({  
        children:[new Paragraph({
          text: subTotalAmount.toString(),
         heading: HeadingLevel.HEADING_3
        })],
        margins: contractTableMargins     
      })],
      height: {
        height: 500,
      }
    });  
  return row;
  }
  
  /********** Header **********/
  let headTable = new Table({
    borders: noBorder,
    alignment: AlignmentType.CENTER,
    rows: [
      new TableRow({
        children: [
          new TableCell({
            verticalAlign: "center",
            children: [new Paragraph({
              text: data.companyName,
              heading: HeadingLevel.HEADING_1,

            })],

          })
        ],
      })
    ],
  });
  if (img !== '') {
    const image = Media.addImage(
      doc,
      Uint8Array.from(atob(img), c => c.charCodeAt(0))
    );

    headTable = new Table({
      borders: noBorder,
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({
          children: [
            new TableCell({
              verticalAlign: "center",
              children: [new Paragraph({
                text: data.companyName + "\t\t\t\t\t\t",
                heading: HeadingLevel.HEADING_1,

              })],

            }),
            new TableCell({
              children: [new Paragraph(image)],
            }),
          ],
        })
      ],
    });
  };
  const firstLineIndent = 800;
    
    const contractTableHeaderCells = [];
    for (let header in contractTableHeaders) {
      contractTableHeaderCells.push(new TableCell({        
        children: [new Paragraph({
          text: contractTableHeaders[header],   
          heading: HeadingLevel.HEADING_3       
        })],
        width: {
          size:16,
          type: "pct"
        },
        margins: contractTableMargins,
        verticalAlign: AlignmentType.CENTER,
      }));
    };
    const contractTableHeader = new TableRow({
      children: contractTableHeaderCells,
      tableHeader: true,
    });
    const contractTableAllRows = [];
    contractTableAllRows.push(contractTableHeader);

      const contractTableDataCells = [];      
     
      let signArea = [new Paragraph(''), new Paragraph('')];

        contractTableDataCells.push(new TableCell({        
          children: [new Paragraph({
            text: data.meterSq.toString(),          
          })],
          width: {
            size:16,
            type: "pct"
          },
          margins: contractTableMargins,
          verticalAlign: AlignmentType.CENTER
        }));   
        
        contractTableDataCells.push(new TableCell({        
          children: [new Paragraph({
            text: data.unitPrice.toString(),          
          })],
          width: {
            size:16,
            type: "pct"
          },
          margins: contractTableMargins,
          verticalAlign: AlignmentType.CENTER
        }));   

        contractTableDataCells.push(new TableCell({        
          children: [new Paragraph({
            text: data.currencyType.toString(),          
          })],
          width: {
            size:16,
            type: "pct"
          },
          margins: contractTableMargins,
          verticalAlign: AlignmentType.CENTER
        }));  
        
        contractTableDataCells.push(new TableCell({        
          children: [new Paragraph({
            text: data.currency.toString(),          
          })],
          width: {
            size:16,
            type: "pct"
          },
          margins: contractTableMargins,
          verticalAlign: AlignmentType.CENTER
        })); 

        contractTableDataCells.push(new TableCell({        
          children: [new Paragraph({
            text: data.stampTax.toString(),          
          })],
          width: {
            size:16,
            type: "pct"
          },
          margins: contractTableMargins,
          verticalAlign: AlignmentType.CENTER,          
        })); 

        contractTableAllRows.push(new TableRow({
          children: contractTableDataCells,
          height: {
            height: 500,
          },          
        }));

        contractTableAllRows.push(createContractRowGrands('Br. Fiyat', data.unitPriceTL.toFixed(2), 'TL'));
        contractTableAllRows.push(createContractRowGrands('Net Tutar', data.netTotalTL.toFixed(2), 'TL'));
        contractTableAllRows.push(createContractRowGrands('KDV', data.KDVTL.toFixed(2), '%18'));
        contractTableAllRows.push(createContractRowGrands('Damga Vergisi Tutarı', data.stampTaxTL.toFixed(2), data.stampTax.toString()));
        contractTableAllRows.push(createContractRowGrands('Toplam Tutar', data.totalTL.toFixed(2), 'TL'));


    const contractTable = new Table({
      alignment: AlignmentType.CENTER,
      rows: contractTableAllRows,
    });    

  /****** Sign Area ******/
  if(data.isSignAreaVisible) {
    signArea[1] = new Paragraph({
      text: 'İmza',
      alignment: AlignmentType.END,
      heading: HeadingLevel.HEADING_3
    });
    signArea[0] = new Paragraph({
      text: 'Ad/Soyad',
      alignment: AlignmentType.END,
      heading: HeadingLevel.HEADING_3
    });
  }
  /****** Sign Area ******/


  doc.addSection({
    children: [new Paragraph(
      {
        text: "Tarih: " + data.date + "\n\n\n",
        alignment: AlignmentType.END,
        heading: HeadingLevel.HEADING_3
      }
    ),
    new Paragraph(''), new Paragraph(''), new Paragraph(''),
      headTable,
    new Paragraph(''), new Paragraph(''), new Paragraph(''),
      contractTable,
      new Paragraph(''), new Paragraph(''), new Paragraph(''),
      signArea[0],
      signArea[1]
    ]
  });


  /********** Header **********/

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, "teklif.docx");
    console.log("Document created successfully");
  });

};

export default expoContractWord;