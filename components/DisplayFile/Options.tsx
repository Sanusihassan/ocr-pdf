import type { edit_page } from "../../src/content";
import { Converter } from "./Options/Converter";

const Options = ({
  edit_page,
  theme,
}: {
  edit_page: edit_page;
  theme: string;
}) => {
  return <Converter content={edit_page.converter} theme={theme} />;
};

export default Options;
