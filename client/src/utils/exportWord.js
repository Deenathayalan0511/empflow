import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableRow,
  TableCell,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";

const exportWord = async (employees) => {
  const rows = [];

  rows.push(
    new TableRow({
      children: [
        "ID",
        "Name",
        "Age",
        "Gender",
        "Department",
        "Email",
        "Salary",
      ].map(
        (text) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text, bold: true })],
              }),
            ],
          }),
      ),
    }),
  );

  employees.forEach((emp) => {
    rows.push(
      new TableRow({
        children: [
          emp.id,
          emp.name,
          emp.age,
          emp.gender,
          emp.department,
          emp.email,
          emp.salary,
        ].map(
          (value) =>
            new TableCell({
              children: [new Paragraph(String(value))],
            }),
        ),
      }),
    );
  });

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Employee Management System",
                bold: true,
                size: 32,
              }),
            ],
          }),
          new Paragraph(" "),
          new Table({
            rows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  saveAs(blob, "employees.docx");
};

export default exportWord;
