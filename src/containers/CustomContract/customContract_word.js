import { saveAs } from "file-saver";
import image from '../../assets/test.png';
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
TextRun
} from "docx";


const customContractWord = (img = '', data) => {
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
    // let blob = await fetch(url).then(r => r.blob());
   
      if(img !== '') {
        const image = Media.addImage(
          doc,
          Uint8Array.from(atob(img), c => c.charCodeAt(0))
        ); 
        const table = new Table({
          borders: noBorder,
          alignment: AlignmentType.CENTER,
          rows: [
              new TableRow({               
                  children: [
                      new TableCell({                        
                          verticalAlign: "center",
                          children: [new Paragraph({
                            text: data.companyName + "\t\t\t\t\t\t\t",
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
        doc.addSection({
          children: [new Paragraph(
            {
             text: "Tarih: " + data.date + "\n\n\n",
             alignment: AlignmentType.END,
             heading: HeadingLevel.HEADING_3
            }
            ),
            new Paragraph(''),new Paragraph(''),new Paragraph(''),table]
        });
      
      } else {
        doc.addSection({
          children: [new Paragraph("Hello World")]
        });
      }

    Packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, "teklif.docx");
      console.log("Document created successfully");
    });

};

export default customContractWord;