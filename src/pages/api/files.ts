import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
const rootPath = "/Users/danielvolchek/dotfiles/";

const files = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST")
    // todo change to upload file
    return res.status(400).json({ error: "method not allowed" });

  // if user wants to download a file
  // boolean negation to convert to truthy/falsey and then back to original value
  const download = !!req.query.download;

  // set path to be either whatever is passed in or whatever root path is
  // root path will be set in env
  // todo set path in env; download npm dotenv; process env in files
  let path = rootPath;
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
};

export default files;
