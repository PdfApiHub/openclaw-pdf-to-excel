---
name: pdf-to-excel
description: "Extract tables from PDFs into Excel (XLSX) and CSV. Structured table detection, one sheet per page, and JSON table parsing. Powered by PDFAPIHub."
---
# PDF to Excel & CSV
Extract tables and data from PDFs into spreadsheet formats.
## Tools
| Tool | Description |
|------|-------------|
| `pdf_to_excel` | Convert PDF tables to Excel (XLSX) — one sheet per page |
| `pdf_to_csv` | Convert PDF tables to CSV format |
| `parse_pdf_tables` | Parse PDF tables as structured JSON with bounding boxes |
| `pdf_info` | Check page count before extracting |
## Setup
Get your **free API key** at [https://pdfapihub.com](https://pdfapihub.com).
```json
{ "plugins": { "entries": { "pdf-to-excel": { "enabled": true, "env": { "PDFAPIHUB_API_KEY": "your-key" } } } } }
```
**Privacy note:** Files you process are uploaded to PDFAPIHub's cloud service. Files are auto-deleted after 30 days.

## Examples
- *"Extract tables from this invoice PDF into Excel"*
- *"Convert this PDF report to CSV"*
- *"Parse the tables from this financial statement"*
## Documentation
Full API docs: [https://pdfapihub.com/docs](https://pdfapihub.com/docs)
