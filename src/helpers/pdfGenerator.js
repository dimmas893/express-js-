const fs = require("fs");
const path = require("path");
const pdf = require("html-pdf");

const manipulateUserDataInHtml = (htmlContent, userData) => {
  // Manipulasi data userData dan masukkan ke dalam HTML
  const manipulatedHtmlContent = `
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nama</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        ${userData
          .map(
            (user) => `
          <tr>
            <td>${user.id}</td>
            <td>${user.nama}</td>
            <td>${user.email}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `;

  // Gantilah placeholder atau tag di dalam HTML dengan manipulasi data userData
  const updatedHtmlContent = htmlContent.replace(
    "<data>",
    manipulatedHtmlContent
  );

  return updatedHtmlContent;
};

const generateUserPDF = (userData) => {
  const outputDirectory = path.join(__dirname, "../../public/users");

  // Simpan HTML ke file
  const htmlFilePath = path.join(
    __dirname,
    "../../public/users/usersPdfGenerate.html"
  );
  const htmlFileContent = fs.readFileSync(htmlFilePath, "utf8");

  // Gantilah placeholder atau tag di dalam HTML dengan manipulasi data userData
  const updatedHtmlContent = manipulateUserDataInHtml(
    htmlFileContent,
    userData
  );

  const htmlsave = path.join(outputDirectory, "hasilSaveGeneratePdfUser.html");
  fs.writeFileSync(htmlsave, updatedHtmlContent); // Menggunakan updatedHtmlContent

  const pdfOptions = {
    format: "Letter",
    orientation: "portrait",
  };

  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  const pdfFileName = "usersPdf.pdf";
  const pdfFilePath = path.join(outputDirectory, pdfFileName);

  pdf.create(updatedHtmlContent, pdfOptions).toFile(pdfFilePath, (err, res) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("PDF berhasil dibuat:", res.filename);
  });

  const relativePath = path.join("users", pdfFileName).replace(/\\/g, "/");

  return relativePath;
};

module.exports = { generateUserPDF };
