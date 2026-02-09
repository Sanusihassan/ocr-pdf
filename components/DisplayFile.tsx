import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import type { errors as _, edit_page } from "../src/content";
import Files from "./DisplayFile/Files";
import type { Paths } from "../src/content/content";
type propTypes = {
  extension: string;
  pages: string;
  page: string;
  lang: string;
  errors: _;
  edit_page: edit_page;
  drop_files: string;
  path: Paths;
};

const DisplayFile = ({
  extension,
  pages,
  page,
  lang,
  errors,
  edit_page,
  drop_files,
  path,
}: propTypes) => {
  const [toolTipSizes, setToolTipSizes] = useState<string[]>([]);

  useEffect(() => {}, [extension]);

  return (
    <>
      <Files
        errors={errors}
        extension={extension}
        setToolTipSizes={setToolTipSizes}
        toolTipSizes={toolTipSizes}
        loader_text={edit_page.loader_text}
        fileDetailProps={[pages, page, lang]}
        drop_files={drop_files}
        path={path}
        languageSelectProps={{
          content: edit_page.languageSelectContent,
          themeColor: `var(--${path})`,
        }}
      />
    </>
  );
};

export default DisplayFile;
