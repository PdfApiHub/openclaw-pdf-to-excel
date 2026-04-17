import type { PluginEntry } from "@anthropic/openclaw-plugin-sdk";
const API_BASE = "https://pdfapihub.com/api";

async function callApi(endpoint: string, body: Record<string, unknown>, apiKey: string): Promise<unknown> {
  const res = await fetch(`${API_BASE}${endpoint}`, { method: "POST", headers: { "Content-Type": "application/json", "CLIENT-API-KEY": apiKey }, body: JSON.stringify(body) });
  if (!res.ok) { const text = await res.text(); let p: any; try { p = JSON.parse(text); } catch { throw new Error(`PDFAPIHub error (${res.status}): ${text}`); } throw new Error(`PDFAPIHub error (${res.status}): ${p.error || text}`); }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : { success: true, message: "Binary file returned", content_type: ct };
}
function getApiKey(config: Record<string, unknown>): string { const k = (config.apiKey as string) || ""; if (!k) throw new Error("PDFAPIHub API key not configured. Add your key in plugin config. Get a free key at https://pdfapihub.com"); return k; }
function buildBody(params: Record<string, unknown>): Record<string, unknown> { const b: Record<string, unknown> = {}; for (const [k, v] of Object.entries(params)) { if (v !== undefined && v !== null) b[k] = v; } return b; }

const plugin: PluginEntry = {
  id: "pdf-to-excel", name: "PDF to Excel & CSV",
  register(api) {
    api.registerTool({
      name: "pdf_to_excel",
      description: "Extract tables and text from a PDF into an Excel workbook (XLSX). Each page becomes a separate sheet. Uses PyMuPDF table detection with fallback to line-by-line extraction. Great for invoices, financial statements, and reports.",
      parameters: { type: "object", properties: {
        url: { type: "string", description: "URL to a PDF." },
        file: { type: "string", description: "Base64-encoded PDF." },
        pages: { type: "string", description: "Page selection: '2-4' or omit for all." },
        output: { type: "string", enum: ["url", "base64", "file"], description: "Output mode. Default: 'url'." },
        output_filename: { type: "string", description: "Custom filename (e.g. 'tables.xlsx')." },
      }},
      async execute(params, context) { return callApi("/v1/convert/pdf/xlsx", buildBody(params), getApiKey(context.config)); },
    });

    api.registerTool({
      name: "pdf_to_csv",
      description: "Extract tables and text from a PDF into CSV format. Ideal for importing PDF data into databases, BI tools, or spreadsheets. Uses structured table detection.",
      parameters: { type: "object", properties: {
        url: { type: "string", description: "URL to a PDF." },
        file: { type: "string", description: "Base64-encoded PDF." },
        pages: { type: "string", description: "Page selection." },
        output: { type: "string", enum: ["url", "base64", "file"], description: "Output mode. Default: 'url'." },
        output_filename: { type: "string", description: "Custom filename (e.g. 'data.csv')." },
      }},
      async execute(params, context) { return callApi("/v1/convert/pdf/csv", buildBody(params), getApiKey(context.config)); },
    });

    api.registerTool({
      name: "parse_pdf_tables",
      description: "Parse a PDF into structured JSON with tables, text blocks, and layout information. Mode 'tables' extracts table data with bounding boxes. Mode 'full' includes text + blocks + tables + images.",
      parameters: { type: "object", properties: {
        url: { type: "string", description: "URL to a PDF." },
        mode: { type: "string", enum: ["text", "layout", "tables", "full"], description: "Parse mode. 'tables' for table-focused extraction. Default: 'tables'." },
        pages: { type: "string", description: "Page selection. Default: 'all'." },
      }},
      async execute(params, context) {
        const body = buildBody(params);
        if (!body.mode) body.mode = "tables";
        return callApi("/v1/pdf/parse", body, getApiKey(context.config));
      },
    });

    api.registerTool({
      name: "pdf_info",
      description: "Get PDF page count and metadata before extracting tables.",
      parameters: { type: "object", properties: {
        url: { type: "string", description: "URL to a PDF." },
        base64_pdf: { type: "string", description: "Base64-encoded PDF." },
      }},
      async execute(params, context) { return callApi("/v1/pdf/info", buildBody(params), getApiKey(context.config)); },
    });
  },
};
export default plugin;
