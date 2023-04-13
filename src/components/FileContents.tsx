import { useMemo } from "react";
import { MinimalFile } from "./FileWrapper";
import Loading from "./Loading";

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + x);
}

const FileContents = ({ file }: { file: MinimalFile | null }) => {
  if (!file) return <Loading />;

  const RenderContents = ({ file }: { file: MinimalFile }) => {
    switch (file.type) {
      case "DIRECTORY":
        return null;
      case "TEXT":
        // return text object
        return <Text text={file.content} />;
      case "IMAGE":
        // return rendered image
        return <Image image_string={file.content} />;
      case "UNKNOWN":
        // return "unknown file type"
        return null;
      default:
        // ts trick to ensure that if I add a new type to file I error for not fulfilling type contract
        return assertNever(file);
    }
  };

  return (
    <div className="flex flex-col overflow-auto max-h-screen w-full">
      <h2 className="font-bold">{file.path}</h2>
      {<RenderContents file={file} />}
    </div>
  );
};

export default FileContents;

const Text = ({ text }: { text: string }) => {
  const split = useMemo(() => text.split("\n"), [text]);

  return (
    <div className="flex flex-col">
      {split.map((line) => (
        <div key={line}>{line}</div>
      ))}
    </div>
  );
};

const Image = ({ image_string }: { image_string: string }) => {
  return <img src={`data:image/jpeg;base64,${image_string}`} alt="" />;
};
