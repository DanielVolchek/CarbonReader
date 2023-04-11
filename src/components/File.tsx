import { MinimalFile } from "./FileWrapper";
import Loading from "./Loading";

const getNameFromFile = (file: string) => {
  return file.split("/").pop();
};

const File = ({
  file,
  fetchFiles,
}: {
  file: string | null;
  fetchFiles: (s: string) => Promise<void>;
}) => {
  if (!file) return <Loading />;

  const handleClick = async () => {
    console.log("sending path " + file);
    await fetchFiles(file);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer hover:underline min-w-[15vw]"
    >
      {getNameFromFile(file)}
    </div>
  );
};

export default File;
