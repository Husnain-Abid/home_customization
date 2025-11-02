declare module "jspdf-autotable" {
  import jsPDF from "jspdf";

  export interface AutoTableOptions {
    head?: any[][];
    body?: any[][];
    startY?: number;
    styles?: Record<string, any>;
    headStyles?: Record<string, any>;
  }

  export interface jsPDFWithPlugin extends jsPDF {
    autoTable: (options: AutoTableOptions) => void;
    lastAutoTable: { finalY: number };
  }

  const autoTable: (doc: jsPDFWithPlugin, options: AutoTableOptions) => void;
  export default autoTable;
}
