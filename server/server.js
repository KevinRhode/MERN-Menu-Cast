//import 'core-js/stable';
//import 'regenerator-runtime/runtime';

const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const path = require("path");
const fs = require("fs");

const { authMiddleware } = require("./utils/auth");
const { v4: uuidv4 } = require('uuid');

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
const multer = require("multer");

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    return cb(null,uuidv4() + path.extname(file.originalname));
    //   )
    // cb(
    //   null,
    //   new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    // );
  },
});

const fileFilter = (req, file, cb) => {
  // Only accept .png, .jpg, and .pdf files
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, // Limit to 5MB
  },
  fileFilter: fileFilter,
});
// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Serve up static assets
  app.use("/images", express.static(path.join(__dirname, "../client/images")));
  app.use("/uploads",express.static('public/uploads'));
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,
    })
  );
  // Endpoint for uploading files
  app.post("/uploads", upload.single("file"), (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({
        error: "Invalid file type. Only .png, .jpg and .pdf files are allowed.",
      });
    }
    res.status(201).json({
      message: "File uploaded successfully!",
      file: req.file.path,
    });
  });
  app.delete("/uploads/:id", (req, res, next) =>{
// Extract the file ID or name from the request parameters
const filePath = path.join(__dirname, '/public/uploads/', req.params.id);

    // Check if the file exists
    console.log(__dirname);
    console.log(req.params.id);
    
    fs.exists(filePath, (exists) => {
        if (!exists) {
            return res.status(404).json({
                error: "File not found.",
            });
        }

        // Delete the file
        fs.unlink(filePath, (err) => {
            if (err) {
                return res.status(500).json({
                    error: "Failed to delete the file.",
                });
            }

            res.status(200).json({
                message: "File deleted successfully!",
            });
        });
    });
  });

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Call the async function to start the server
startApolloServer();
