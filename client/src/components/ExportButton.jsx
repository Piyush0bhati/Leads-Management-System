import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportButton({ leads }) {
  const exportToExcel = () => {
    if (!leads || leads.length === 0) {
      alert("No leads available to export.");
      return;
    }

    const data = leads.map((lead) => ({
      Name: lead.name,
      Email: lead.email,
      Phone: lead.phone,
      Company: lead.company,
      Status: lead.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Leads"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "Leads.xlsx");
  };

  return (
    <button
      onClick={exportToExcel}
      className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700"
    >
      📥 Export Excel
    </button>
  );
}

export default ExportButton;