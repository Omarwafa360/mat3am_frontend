import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // حاول تحميل الألوان من localStorage عند بدء التشغيل
  const [pageBackgrounds, setPageBackgrounds] = useState(() => {
    try {
      const storedBackgrounds = localStorage.getItem('pageBackgrounds');
      return storedBackgrounds ? JSON.parse(storedBackgrounds) : {
        Home: "#ffffff",
        About: "#ffffff",
        Menu: "#ffffff",      // 👈 تم إضافة هذه الصفحة
        Gallery: "#ffffff",   // 👈 تم إضافة هذه الصفحة
        Contact: "#ffffff",   // 👈 تم إضافة هذه الصفحة
        // أضف صفحات أخرى إذا تريد
      };
    } catch (error) {
      console.error("Failed to load page backgrounds from localStorage", error);
      return {
        Home: "#ffffff",
        About: "#ffffff",
        Menu: "#ffffff",
        Gallery: "#ffffff",
        Contact: "#ffffff",
      };
    }
  });

  // حفظ الألوان في localStorage كلما تغيرت
  useEffect(() => {
    try {
      localStorage.setItem('pageBackgrounds', JSON.stringify(pageBackgrounds));
    } catch (error) {
      console.error("Failed to save page backgrounds to localStorage", error);
    }
  }, [pageBackgrounds]); // أعد تشغيل التأثير كلما تغيرت pageBackgrounds

  const setThemeForPage = (page, color) => {
    setPageBackgrounds(prev => ({ ...prev, [page]: color }));
  };

  return (
    <ThemeContext.Provider value={{ pageBackgrounds, setThemeForPage }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
