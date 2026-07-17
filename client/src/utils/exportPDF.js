import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const exportPDF = (employees) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Employee Management System", 14, 15);

  doc.setFontSize(12);
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 24);

  const tableColumn = [
    "ID",
    "Name",
    "Age",
    "Gender",
    "Department",
    "Email",
    "Salary",
  ];

  const tableRows = employees.map((emp) => [
    emp.id,
    emp.name,
    emp.age,
    emp.gender,
    emp.department,
    emp.email,
    emp.salary,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 32,
    theme: "grid",
  });

  doc.save("employees.pdf");
};

export default exportPDF;
