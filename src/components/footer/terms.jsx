import React from 'react';
import { Document, Page } from 'react-pdf';

const MyPdfViewer = () => {
    const pdfUrl = 'URL_ВАШЕГО_PDF'; // Замените на URL вашего PDF

    return (
        <div>
            <Document file={pdfUrl}>
                <Page pageNumber={1} />
            </Document>
        </div>
    );
};

export default terms;