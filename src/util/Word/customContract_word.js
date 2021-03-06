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



const customContractWord = (img = '', data, contractTableHeaders) => {
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
  let entryTxtParagraph = new Paragraph('');
  let contractTable = new Paragraph('');
  let lastTxtParagraph = new Paragraph('');
  let signArea = [new Paragraph(''), new Paragraph('')];

  if (data.entryTxt !== '') {
    entryTxtParagraph = new Paragraph({
      text: data.entryTxt,
      indent: {
        firstLine: firstLineIndent
      }
    });
  };

  if (data.lastTxt !== '') {
    lastTxtParagraph = new Paragraph({
      text: data.lastTxt,
      indent: {
        firstLine: firstLineIndent
      }
    });
  };

  if (parseFloat(data.grandTotal) !== 0) {
    
    const contractTableHeaderCells = [];
    for (let header in contractTableHeaders) {
      contractTableHeaderCells.push(new TableCell({        
        children: [new Paragraph({
          text: contractTableHeaders[header].label,   
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

    for(let el in data.serviceItems) {
      const contractTableDataCells = [];
      for(let opts in data.serviceItems[el]) {
        console.log(parseInt(el));
        switch (opts) {
          case 'rowId': 
          contractTableDataCells.push(new TableCell({        
            children: [new Paragraph({
              text: (parseInt(el) + 1).toString(),          
            })],
            width: {
              size:16,
              type: "pct"
            },
            margins: contractTableMargins,
            verticalAlign: AlignmentType.CENTER
          }));
          break;
          default:
            contractTableDataCells.push(new TableCell({        
              children: [new Paragraph({
                text: data.serviceItems[el][opts].toString(),          
              })],
              width: {
                size:16,
                type: "pct"
              },
              margins: contractTableMargins,
              verticalAlign: AlignmentType.CENTER
            }));
            break;
        }
      }
       

        contractTableAllRows.push(new TableRow({
          children: contractTableDataCells,
          height: {
            height: 500,
          }
        }));
    };   

    contractTableAllRows.push(createContractRowGrands('Genel Toplam', data.grandTotal.toFixed(2)));
    parseFloat(data.discount) !== 0 && contractTableAllRows.push(createContractRowGrands('İndirim', data.discountAmount.toFixed(2) ,'%' + data.discount));
    parseFloat(data.tax) !== 0 && contractTableAllRows.push(createContractRowGrands('KDV', data.taxAmount.toFixed(2) ,'%' + data.tax));
    contractTableAllRows.push(createContractRowGrands('Net Toplam', data.netAmount));

    contractTable = new Table({
      alignment: AlignmentType.CENTER,
      rows: contractTableAllRows
    });    
  };

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
      entryTxtParagraph,
      new Paragraph(''), new Paragraph(''), new Paragraph(''),
      contractTable,
      new Paragraph(''), new Paragraph(''), new Paragraph(''),
      lastTxtParagraph,
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

export default customContractWord;