// keep in mind that i have a converter state variable: const converter: "free" | "premium"
// only if it's "premium" then we'll filter the language set.
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SUPPORTED_OCR_LANGUAGES } from "../src/convertApiLanguages";
import Select from "react-select";
import {
  setField,
  selectLanguagesForFile,
  selectSelectedLanguages,
  type ToolState,
} from "../src/store";
import type { edit_page as _edit_pages } from "../src/content";
import type {
  StylesConfig,
  CSSObjectWithLabel,
  OptionProps,
  GroupBase,
  ActionMeta,
  MultiValue,
} from "react-select";
import { sanitizeKey } from "../src/utils";
import { languages } from "../src/content/languages";

type OptionType = {
  value: string;
  label: string;
};

interface LanguageSelectProps {
  themeColor: string;
  fileName: string;
  content: _edit_pages["languageSelectContent"];
}

export const LanguageSelect: React.FC<LanguageSelectProps> = ({
  themeColor,
  fileName,
  content,
}) => {
  const dispatch = useDispatch();

  // Get the sanitized key for this file
  const fileKey = sanitizeKey(fileName.split(".")[0]);

  // Use memoized selector to get languages for this file only
  // This prevents unnecessary rerenders and Redux warnings
  const currentFileLanguages = useSelector(
    useMemo(() => selectLanguagesForFile(fileKey), [fileKey]),
  );

  // Get all selected languages for updating state
  const allSelectedLanguages = useSelector(selectSelectedLanguages);

  const converter = useSelector(
    (state: { tool: ToolState }) => state.tool.converter,
  );
  // Language options from the languages object
  const languageOptions = useMemo(
    () =>
      Object.entries(languages)
        .filter(
          ([code]) =>
            converter !== "premium" || SUPPORTED_OCR_LANGUAGES.has(code),
        )
        .map(
          ([value, language]: [
            string,
            { name: string; nativeName: string },
          ]) => ({
            value,
            label: `${language.name} (${language.nativeName})`,
          }),
        ),
    [converter],
  );

  // Multi-select styles with dynamic theme color
  const multiSelectStyles: StylesConfig<OptionType, true> = useMemo(
    () => ({
      option: (
        base: CSSObjectWithLabel,
        state: OptionProps<OptionType, true, GroupBase<OptionType>>,
      ) => ({
        ...base,
        backgroundColor: state.isSelected ? themeColor : "white",
        color: state.isSelected ? "white" : "black",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: state.isSelected ? themeColor : "#ddd",
          color: state.isSelected ? "white" : "black",
        },
      }),
      multiValue: (base) => ({
        ...base,
        backgroundColor: themeColor + "20",
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: themeColor,
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: themeColor,
        "&:hover": {
          backgroundColor: themeColor,
          color: "white",
        },
      }),
    }),
    [themeColor],
  );

  /**
   * Handle language selection change
   * - Limit to max 3 languages
   * - Update Redux state with new selections for this file
   * - Keep other files' selections intact
   */
  const handleLanguageSelectChange = (
    selectedOptions: MultiValue<OptionType>,
    _actionMeta: ActionMeta<OptionType>,
  ) => {
    const newLanguages = Array.from(selectedOptions).map((opt) => opt.value);

    // Limit to 3 languages max
    if (newLanguages.length > 3) {
      newLanguages.pop();
    }

    // Get all selections excluding this file
    const otherFilesLanguages = allSelectedLanguages.filter(
      (item) => item.k !== fileKey,
    );

    // Create new entry for this file if languages are selected
    const newEntry =
      newLanguages.length > 0
        ? {
            k: fileKey,
            langs: newLanguages,
          }
        : null;

    // Dispatch updated state
    dispatch(
      setField({
        selectedLanguages: [
          ...otherFilesLanguages,
          ...(newEntry ? [newEntry] : []),
        ],
      }),
    );
  };

  const showWarning = currentFileLanguages.length === 0;

  // Map current languages to Select options for display
  const selectedOptions = useMemo(
    () =>
      languageOptions.filter((option) =>
        currentFileLanguages.includes(option.value),
      ),
    [currentFileLanguages, languageOptions],
  );

  return (
    <div className="space-y-2">
      {showWarning && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
          <svg
            className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-yellow-800">{content.warning}</p>
        </div>
      )}

      <Select
        isMulti
        name="languages"
        options={languageOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        styles={multiSelectStyles}
        placeholder={content.placeholder}
        onChange={handleLanguageSelectChange}
        value={selectedOptions}
        isDisabled={currentFileLanguages.length >= 3}
        closeMenuOnSelect={false}
      />
    </div>
  );
};
