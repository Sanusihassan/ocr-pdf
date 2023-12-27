import { Dispatch, useCallback } from "react";
import { emptyPDFHandler } from "../utils";
import type { errors } from "@/content";
import { AnyAction } from "@reduxjs/toolkit";

export const useGetFileDetailsTooltipContent = ({
  pageCount,
  dispatch,
}: {
  pageCount: number;
  dispatch: Dispatch<AnyAction>;
}) => {
  //   const pageCount = useSelector(
  //     (state: { tool: ToolState }) => state.tool.pageCount
  //   );
  //   const dispatch = useDispatch();

  const getFileDetailsTooltipContent = async (
    file: File,
    pages: string,
    page: string,
    lang: string,
    errors: errors
  ): Promise<string> => {
    const sizeInBytes = file.size;
    let size: string = "";
    let isoCode = lang === "fr" ? "fr-FR" : lang == "" ? "en" : lang;
    size = new Intl.NumberFormat(isoCode, {
      notation: "compact",
      style: "unit",
      unit: "byte",
      unitDisplay: "narrow",
    }).format(sizeInBytes);
    let tooltipContent = "<bdi>" + size;
    if (file.size === 0) {
      emptyPDFHandler(dispatch, errors);
      throw Error("ERROR: FILE_SIZE_ZERO");
    } else {
      if (
        file.type !== "image/png" &&
        file.type !== "image/jpeg" &&
        file.type !== "application/pdf"
      ) {
        return tooltipContent;
      }
      try {
        if (file.type === "image/jpeg" || file.type === "image/png") {
          const image = new Image();
          image.src = URL.createObjectURL(file);
          await new Promise<void>((resolve) => {
            image.onload = () => {
              tooltipContent += `</bdi> - <bdi>${image.width} x ${image.height}</bdi>`;
              resolve();
            };
          });
        } else if (file.type === "application/pdf") {
          const url = URL.createObjectURL(file);
          // const pdf = await getDocument(url).promise;
          //   tooltipContent += `</bdi> - <bdi>${
          //     lang === "ar" && pageCount === 1 ? "" : pageCount + " "
          //   }${pageCount > 1 ? pages : page}<bdi>`;
          tooltipContent += "</bdi> - <bdi>";
          console.log(pageCount + " " + pages, pages, page);
          if (lang === "ar" && pageCount === 1) {
            tooltipContent += page;
          } else if (pageCount === 2 && lang === "ar") {
            tooltipContent += " - صفحتين";
          } else if (lang === "ar" && pageCount > 2) {
            tooltipContent += pageCount + " " + pages;
          } else if (lang !== "ar") {
            tooltipContent += pageCount > 1 ? pageCount + " " + pages : page;
          }

          tooltipContent += "</bdi>";
          URL.revokeObjectURL(url);
          if (!file.size) {
            emptyPDFHandler(dispatch, errors);
          }
        }
      } catch (e) {
        if (!file.size) {
          emptyPDFHandler(dispatch, errors);
        }
      }
    }

    return tooltipContent;
  };
  return useCallback(getFileDetailsTooltipContent, [pageCount, dispatch]);
};
