import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import multer from "multer";
import fs from "fs";

const router = createRouter<NextApiRequest, NextApiResponse>();
const TEMP_DIR = __dirname + "/.temp";
const ROOT_PATH = "/Users/danielvolchek/dotfiles/";

const upload = multer({
  storage: multer.diskStorage({
    destination: () => {
      // upload to temp directory and move to correct directory afterwards
      if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });
    },
    filename: (_, file, cb) => cb(null, file.originalname),
  }),
});

router
  .use(upload.array("files"))
  .get((req, res) => {
    // if user wants to download a file
    // boolean negation to convert to truthy/falsey and then back to original value
    const download = !!req.query.download;

    // set path to be either whatever is passed in or whatever root path is
    // root path will be set in env
    // todo set path in env; download npm dotenv; process env in files
    let path = ROOT_PATH;
    if (req.query.path != undefined && !Array.isArray(req.query.path))
      path = req.query.path;

    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
      if (download)
        // zip file and send it
        return;
      else {
        // send the names of the files in the directory
        const files = fs.readdirSync(path);
        res.status(200).json({ files });
      }
    }
    // convert to mime type and send it
    else console.log();
  })
  .post(async (req, res) => {
    // upload
  });
// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(400).json({ error: "Invalid request method" });
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};
