import { MinimalFile } from "./FileWrapper";
import Loading from "./Loading";
import File from "./File";

const FileList = ({
  files,
  fetchFiles,
}: {
  files: string[];
  fetchFiles: (s: string) => Promise<void>;
}) => {
  if (!files) return <Loading />;

  return (
    <div className="border-r-2 border-gray-800 flex flex-col gap-4">
      {files.map((file) => (
        <File file={file} fetchFiles={fetchFiles} />
      ))}
    </div>
  );
};

export default FileList;
