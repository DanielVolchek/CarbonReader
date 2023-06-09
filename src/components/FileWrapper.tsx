import { useEffect, useState } from "react";
import Loading from "./Loading";
import FileList from "./FileList";
import FileContents from "./FileContents";

// type FileType = "directory" | "image" | "text" | "unknown";

export type DirectoryFile = { path: string; type: "DIRECTORY" | "FILE" };

export type MinimalFile = { path: string } & (
  | {
      type: "DIRECTORY";
      content: DirectoryFile[];
    }
  | {
      type: "IMAGE" | "TEXT";
      content: string; // TODO check if this should be one big string (I think for image it should be) or if it should be array of strings
      // if it should be one big string than seperate by \n char
    }
  | {
      type: "UNKNOWN";
      content: null;
    }
);

const FileWrapper = () => {
  const [currentPath, setCurrentPath] = useState(null);
  const [files, setCurrentFiles] = useState<DirectoryFile[]>([]);
  const [data, setCurrentData] = useState<MinimalFile | null>(null);

  const fetchFiles = async (file?: string | null) => {
    const res = await fetch(`/api/files${file ? `?path=${file}` : ""}`);
    const data = (await res.json()) as MinimalFile;
    if (!data.content) {
      // TODO check if necessary
      console.log(
        "NO CONTENT (TODO check if necessary to take no data in this directory)"
      );
      return;
    }
    if (data.type === "DIRECTORY") {
      setCurrentFiles(data.content);
    } else {
      setCurrentData(data);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchFiles(currentPath);
    })();
  }, [currentPath]);

  if (!currentPath && !files) return <Loading />;

  return (
    <div className="bg-white w-[90%] border-[5px] p-2 border-gray-800 flex h-[90%]">
      <FileList files={files} fetchFiles={fetchFiles} />
      <FileContents file={data} />
    </div>
  );
};

export default FileWrapper;
