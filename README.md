# PDF to Excel & CSV — OpenClaw Plugin
Extract tables from PDFs into Excel and CSV using the [PDFAPIHub](https://pdfapihub.com) API. Table detection with fallback, one sheet per page, and structured JSON parsing.
## Features
- **PDF to XLSX** — Each page becomes a separate sheet with detected tables
- **PDF to CSV** — Tabular data for databases and BI tools
- **Table Parsing** — Structured JSON with table data and bounding boxes
- **PyMuPDF Detection** — Smart table detection with line-by-line fallback
- **Page Selection** — Extract from specific pages only
## Tools
| `pdf_to_excel` | PDF tables → Excel workbook |
| `pdf_to_csv` | PDF tables → CSV |
| `parse_pdf_tables` | PDF tables → structured JSON |
| `pdf_info` | Page count and metadata |
## Installation
```bash
openclaw plugins install clawhub:pdf-to-excel
```
## Use Cases
- **Invoice Data** — Extract line items and totals from PDF invoices
- **Financial Statements** — Convert PDF bank statements to Excel
- **Report Mining** — Pull tabular data from PDF reports
- **Tax Preparation** — Extract financial data into spreadsheets
- **Data Pipelines** — Feed PDF table data into ETL processes
## License
MIT
