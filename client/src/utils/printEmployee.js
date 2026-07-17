const printEmployees = (employees) => {
  const win = window.open("", "", "width=1000,height=700");

  win.document.write(`
<html>
<head>

<title>Employees</title>

<style>

table{

width:100%;
border-collapse:collapse;

}

th,td{

border:1px solid black;
padding:8px;
text-align:center;

}

</style>

</head>

<body>

<h2>Employee List</h2>

<table>

<tr>

<th>ID</th>
<th>Name</th>
<th>Age</th>
<th>Gender</th>
<th>Department</th>
<th>Email</th>
<th>Salary</th>

</tr>

${employees
  .map(
    (e) => `
<tr>
<td>${e.id}</td>
<td>${e.name}</td>
<td>${e.age}</td>
<td>${e.gender}</td>
<td>${e.department}</td>
<td>${e.email}</td>
<td>${e.salary}</td>
</tr>`,
  )
  .join("")}

</table>

</body>

</html>
`);

  win.print();

  win.close();
};

export default printEmployees;
