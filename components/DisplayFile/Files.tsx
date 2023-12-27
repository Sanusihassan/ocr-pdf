import { Dispatch, SetStateAction, useEffect } from "react";
import type { errors as _ } from "../../content";
import FileCard from "./FileCard";
import { isDraggableExtension } from "../../src/utils";
import { useRouter } from "next/router";
import { useFileStore } from "../../src/file-store";

type FileProps = {
  errors: _;
  extension: string;
  toolTipSizes: string[];
  setToolTipSizes: Dispatch<SetStateAction<string[]>>;
  loader_text: string;
  showSpinner: boolean;
  fileDetailProps: [string, string, string];
};
const Files = ({
  errors,
  extension,
  loader_text,
  fileDetailProps,
}: FileProps) => {
  const { files } = useFileStore();

  useEffect(() => {}, [files]);
  return (
    <>
      <div className="display-file">
        {files.map((file, index) => (
          <div className="drag-element">
            <FileCard
              extension={extension}
              file={file}
              index={index}
              errors={errors}
              loader_text={loader_text}
              fileDetailProps={fileDetailProps}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Files;
