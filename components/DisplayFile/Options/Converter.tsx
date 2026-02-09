// Converter.tsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, type ToolState } from "../../../src/store";
import { Tooltip } from "react-tooltip";
import type { edit_page } from "../../../src/content";
import { Info, X } from "lucide-react";

export const Converter = ({
  content,
  theme,
}: {
  content: edit_page["converter"];
  theme: string;
}) => {
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = useState(true);
  const converter = useSelector(
    (state: { tool: ToolState }) => state.tool.converter
  );

  const handleConverterChange = (converter: "free" | "premium") => {
    dispatch(
      setField({
        converter,
      })
    );
  };

  return (
    <>
      <div className="flex justify-evenly">
        {/* Premium Button */}
        <button
          data-tooltip-id="premium-tooltip"
          data-tooltip-content={content.premiumToolTip}
          onClick={() => handleConverterChange("premium")}
          style={
            converter === "premium" ? { backgroundColor: theme } : undefined
          }
          className={`
          px-6 py-2.5 rounded-lg font-medium transition-all duration-200
          ${
            converter === "premium"
              ? "text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
        >
          {content.premium}
        </button>

        {/* Free Button */}
        <button
          data-tooltip-id="free-tooltip"
          data-tooltip-content={content.freeToolTip}
          onClick={() => handleConverterChange("free")}
          style={converter === "free" ? { backgroundColor: theme } : undefined}
          className={`
          px-6 py-2.5 rounded-lg font-medium transition-all duration-200
          ${
            converter === "free"
              ? "text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }
        `}
        >
          {content.free}
        </button>

        {/* Tooltips */}
        <Tooltip id="free-tooltip" place="bottom" />
        <Tooltip id="premium-tooltip" place="top" />
      </div>

      {/* Info Alert */}
      {showAlert ? (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800 mt-5">
          <Info className="h-5 w-5 shrink-0 mt-0.5" />
          <p className="text-sm mb-0 flex-1">
            {converter === "free"
              ? content.freeToolTip
              : content.premiumToolTip}
          </p>
          <button
            onClick={() => setShowAlert(false)}
            className="shrink-0 text-blue-600 hover:text-blue-800 transition-colors"
            aria-label="Close alert"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  );
};
