import { DirectoryFile, MinimalFile } from "./FileWrapper";
import Loading from "./Loading";
import File from "./File";
import { useMemo } from "react";

const FileList = ({
  files,
  fetchFiles,
}: {
  files: DirectoryFile[];
  fetchFiles: (s: string) => Promise<void>;
}) => {
  if (!files) return <Loading />;

  const getCurrentFile = () => {
    if (typeof window === "undefined") return "";
    if (!files || !files[0]) return "";
    const back = files[0].path.split("/");
    // pop file name
    back.pop();
    // pop directory name
    if (back.length === 1) return "/";
    return back.join("/");
  };

  const getBackFile = () => {
    if (typeof window === "undefined") return "";
    if (!files || !files[0]) return "";
    const back = files[0].path.split("/");
    // pop file name
    back.pop();
    // pop directory name
    back.pop();
    // if root
    // TODO fix in api
    // we are sending "/" to url which breaks
    // instead send encoded version
    // and process on backend encoded as "/"
    if (back.length === 1) return "%2F";
    // return the directory behind current
    return back.join("/");
  };

  return (
    <div className="border-r-2 border-gray-800 flex flex-col gap-4 overflow-x-auto">
      <h2 className="font-bold">{getCurrentFile()}</h2>
      <File
        file={{ type: "FILE", path: "" }}
        fetchFiles={fetchFiles}
        back={getBackFile()}
      />
      {files.map((file) => (
        <File key={file.path} file={file} fetchFiles={fetchFiles} />
      ))}
    </div>
  );
};

export default FileList;
