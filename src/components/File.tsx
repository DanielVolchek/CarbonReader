import { DirectoryFile, MinimalFile } from "./FileWrapper";
import Loading from "./Loading";

const getNameFromFile = (file: string) => {
  return file.split("/").pop();
};

const File = ({
  file,
  fetchFiles,
  back,
}: {
  file: DirectoryFile;
  fetchFiles: (s: string) => Promise<void>;
  back?: string;
}) => {
  if (!file) return <Loading />;

  const handleClick = async () => {
    console.log("sending path " + file);
    if (!file.path) return await fetchFiles(back ? back : "");
    await fetchFiles(file.path);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:underline min-w-[15vw]"
    >
      {back ? ".." : getNameFromFile(file.path)}
      {typeof file !== "string" && file.type === "DIRECTORY" && "/"}
    </div>
  );
};

export default File;
