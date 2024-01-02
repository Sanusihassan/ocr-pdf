// the problem with this component is that when pageCount is updated it rerenders completely, but i want only the data-tooltip-html={tooltipSize} area to be updated
// i.e the part of the component where it renders the tooltipSize
import { ActionDiv, ActionProps } from "./ActionDiv";
import { Tooltip } from "react-tooltip";
import type { errors as _, errors } from "../../content";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import {
  calculatePages,
  getFirstPageAsImage,
  getPlaceHoderImageUrl,
} from "../../src/utils";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setPageCount } from "@/src/store";
import { useGetFileDetailsTooltipContent } from "@/src/hooks/useGetFileDetailsTooltipContent";
type OmitFileName<T extends ActionProps> = Omit<T, "fileName">;

type CardProps = OmitFileName<ActionProps> & {
  index: number;
  file: File;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
};

const TooltipSizeComponent = ({
  file,
  index,
  errors,
  fileDetailProps,
}: Omit<CardProps, "extension" | "loader_text">) => {
  const [tooltipSize, setToolTipSize] = useState("");
  const dispatch = useDispatch();
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  const getFileDetailsTooltipContent = useGetFileDetailsTooltipContent({
    pageCount,
    dispatch,
  });
  useEffect(() => {
    (async () => {
      let size = await getFileDetailsTooltipContent(
        file,
        ...fileDetailProps,
        errors
      );
      setToolTipSize(size);
    })();
  }, [pageCount]);
  return (
    <div
      data-tooltip-id={`item-tooltip-${index}`}
      className="tooltip-wrapper"
      data-tooltip-html={tooltipSize}
      data-tooltip-place="top"
    />
  );
};

const FileCard = ({
  index,
  file,
  errors,
  extension,
  loader_text,
  fileDetailProps,
}: CardProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  let isSubscribed = true;

  useEffect(() => {
    (async () => {
      const _pageCount = await calculatePages(file);
      dispatch(setPageCount(_pageCount));
    })();
    const processFile = async () => {
      try {
        setShowLoader(true);
        if (extension && extension === ".pdf") {
          if (isSubscribed) {
            setImageUrl(await getFirstPageAsImage(file, dispatch, errors));
          }
        } else if (extension && extension !== ".jpg") {
          if (isSubscribed) {
            setImageUrl(
              !file.size
                ? "/images/corrupted.png"
                : getPlaceHoderImageUrl(extension)
            );
          }
        }
      } catch (error) {
        console.error("Error processing files:", error);
      } finally {
        setShowLoader(false);
      }
    };
    processFile();
    return () => {
      isSubscribed = false;
    };
  }, [extension, file]);
  return (
    <div className="card item">
      <TooltipSizeComponent
        index={index}
        errors={errors}
        file={file}
        fileDetailProps={fileDetailProps}
      />
      {showLoader ? <Loader loader_text={loader_text} /> : null}
      <bdi>
        <Tooltip id={`item-tooltip-${index}`} />
      </bdi>
      <ActionDiv
        extension={extension}
        index={index}
        errors={errors}
        fileName={file.name}
      />
      <div className="card-body d-flex flex-column">
        {!showLoader ? (
          <img
            className="img-fluid-custom object-fit-contain rounded item-img"
            src={imageUrl}
            alt={`Selected file ${index}`}
            draggable={false}
          />
        ) : null}

        <p className="text-center">{file.name}</p>
      </div>
    </div>
  );
};

export default FileCard;
