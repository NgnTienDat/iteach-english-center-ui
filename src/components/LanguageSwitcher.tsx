import React from "react";
import i18n from "../i18n";

const LanguageSwitcher: React.FC = () => {
  const currentLang = i18n.language || "en";

  const changeLanguage = (lang: "en" | "vi") => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="inline-flex rounded-lg shadow-md border border-gray-300 bg-white p-1">
      <button
        onClick={() => changeLanguage("en")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${currentLang === "en"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        aria-pressed={currentLang === "en"}
      >
        <span className="text-[12px] mr-1">GB</span> EN
      </button>
      <button
        onClick={() => changeLanguage("vi")}
        className={`px-4 py-2 text-sm font-medium rounded-lg transition ${currentLang === "vi"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        aria-pressed={currentLang === "vi"}
      >
        <span className="text-[12px] mr-1">VN</span> VN
      </button>
    </div>
  );
};

export default LanguageSwitcher;