const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      res.render("pages/index", { files: files });
    }
  });
});

app.get("/", (req, res) => {
  fs.readdir(`./files`, function (err, files) {
    if (err) {
      console.log(err);
    } else {
      res.render("pages/index", { files: files });
    }
  });
});

app.get("/create", (req, res) => {
  res.render("./pages/create");
});

// Function to generate a unique filename
function generateUniqueFilename(directory, baseFilename) {
  let filename = `${baseFilename}.txt`;
  let counter = 1;

  while (fs.existsSync(path.join(directory, filename))) {
    filename = `${baseFilename}(${counter}).txt`;
    counter++;
  }

  return filename;
}

// Route to handle form submission
app.post("/createhisaab", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const currentDate = new Date();
  const date = `${currentDate.getDate()}-${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  // Format the title to emphasize it
  const formattedTitle = `\n*** ${title.toUpperCase()} ***\n\n`;

  // Combine the title and content
  const fileContent = formattedTitle + content;

  // Directory to save the files
  const directory = path.join(__dirname, "files");

  // Generate a unique filename
  const filename = generateUniqueFilename(directory, date);

  // Write to the file
  fs.writeFile(path.join(directory, filename), fileContent, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/");
    }
  });
});

// Function to parse the file content
function parseFileContent(fileContent) {
  const lines = fileContent.split("\n");
  const titleLine = lines.find(
    (line) => line.startsWith("***") && line.endsWith("***")
  );
  const title = titleLine
    ? titleLine.replace(/\*\*\*/g, "").trim()
    : "Untitled";
  const content = lines
    .slice(lines.indexOf(titleLine) + 1)
    .join("\n")
    .trim();
  return { title, content };
}

// Route to handle file editing
app.get("/edit/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "files", fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }

    const { title, content } = parseFileContent(data);

    res.render("pages/edit", { fileName, title, content });
  });
});

app.post("/update/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "files", fileName);
  const { title, content } = req.body;

  // Format the title to emphasize it
  const formattedTitle = `\n*** ${title.toUpperCase()} ***\n\n`;

  // Combine the title and content
  const fileContent = formattedTitle + content;

  const directory = path.join(__dirname, "files");

  // Write to the file
  fs.writeFile(path.join(directory, fileName), fileContent, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Internal Server Error");
    } else {
      res.redirect("/");
    }
  });
});

app.get("/hisaab/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "files", fileName);
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    const { title, content } = parseFileContent(data);
    res.render("pages/read", { fileName, title, content });
  });
});
app.get("/delete/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "files", fileName);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal Server Error");
    }
    res.redirect("/");
  });
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000);
