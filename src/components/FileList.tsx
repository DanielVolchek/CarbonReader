import { MinimalFile } from "./FileWrapper";
import Loading from "./Loading";
import File from "./File";
import { useMemo } from "react";

const FileList = ({
  files,
  fetchFiles,
}: {
  files: { path: string; type: string }[];
  fetchFiles: (s: string) => Promise<void>;
}) => {
  if (!files) return <Loading />;

  const getBackFile = useMemo(() => {
    if (typeof window === "undefined") return "";
    if (!files || !files[0]) return "";
    console.log(files[0]);
    const back = files[0].path.split("/");
    back.pop();
    back.pop();
    return back.join("/");
  }, [files]);

  return (
    <div className="border-r-2 border-gray-800 flex flex-col gap-4">
      <File
        file={{ type: "", path: "" }}
        fetchFiles={fetchFiles}
        back={getBackFile}
      />
      {files.map((file) => (
        <File file={file} fetchFiles={fetchFiles} />
      ))}
    </div>
  );
};

export default FileList;
