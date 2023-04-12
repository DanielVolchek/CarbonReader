import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import os from "os";
const rootPath = process.env.rootPath ?? os.homedir(); // either go to the root set in .env or to users home

const WebImageFormats = ["png", "jpg", "jpeg", "gif", "webp", "svg"];

const isHumanReadable = (filePath: string) => {
  try {
    // Read file contents as a UTF-8 string
    fs.readFileSync(filePath, "utf-8");
    // If the contents can be interpreted as a UTF-8 string, the file is human-readable
    return true;
  } catch (err) {
    // If an error occurs while reading the file, it is not human-readable
    return false;
  }
};

const files = (req: NextApiRequest, res: NextApiResponse) => {
  console.log("files api called");
  if (req.method === "POST")
    // todo change to upload file
    return res.status(400).json({ error: "method not allowed" });

  // if user wants to download a file
  // boolean negation to convert to truthy/falsey and then back to original value
  // (maybe copy the file to public and then send the link to that file)
  const download = !!req.query.download;

  // set path to be either whatever is passed in or whatever root path is
  // root path will be set in env
  // todo set path in env; download npm dotenv; process env in files
  let path = rootPath;
  console.log("step 1: set path");
  if (req.query.path != undefined && !Array.isArray(req.query.path)) {
    console.log("changing path");
    path = req.query.path;
  }
  console.log("path is ", path);

  console.log("step 2: check type");
  const stats = fs.statSync(path);
  if (stats.isDirectory()) {
    // if last character is not indicating that path is a directory append it
    if (path.charAt(path.length - 1) != "/") path += "/";
    console.log("is directory");
    if (download)
      // zip file and send it
      return;
    else {
      // send the names of the files in the directory
      console.log("sending names of files");
      const files = fs.readdirSync(path);
      console.log("got ", files);
      // set files to be their absolute path
      const response = files.map((f) => {
        const full = path + f;
        const type = fs.statSync(full);
        return {
          path: path + f,
          type: type.isDirectory() ? "DIRECTORY" : "FILE",
        };
      });
      return res.status(200).json({ type: "DIRECTORY", content: response });
    }
  }
  if (stats.isFile()) {
    // get file as buffer
    const buffer = fs.readFileSync(path);
    // check if file is image or if it is human-readable
    // get file extension
    const extension = path.split(".").pop();
    if (extension && WebImageFormats.includes(extension)) {
      // if file is image, convert it to base64 and send it

      // Convert the buffer to a Base64-encoded string
      const base64String = buffer.toString("base64");
      return res
        .status(200)
        .json({ type: "IMAGE", content: base64String, extension: extension });
    }
    // if file is human-readable, send it as a string
    const isReadable = isHumanReadable(path);
    if (isReadable) {
      const utf8String = buffer.toString("utf-8");
      return res.status(200).json({ type: "TEXT", content: utf8String });
    }
    return res.status(405).json({ error: "file not human-readable" });
  }
  // return error of something went wrong
  return res.status(500).json({ error: "something went wrong" });
};

export default files;
