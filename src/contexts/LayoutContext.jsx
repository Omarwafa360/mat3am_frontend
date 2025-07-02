import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext(null);

export const LayoutProvider = ({ children }) => {
  // هذه هي الأقسام الافتراضية للصفحة الرئيسية
  // يمكنك تعديلها لتناسب أقسام صفحتك الرئيسية الفعلية
  const [sections, setSections] = useState([
    { id: 'hero', name: 'قسم الهيرو' },
    { id: 'services', name: 'قسم الخدمات' },
    { id: 'menu_preview', name: 'قسم معاينة القائمة' },
    { id: 'testimonials', name: 'قسم آراء العملاء' },
    // أضف هنا أي أقسام أخرى لديك في صفحتك الرئيسية
  ]);

  return (
    <LayoutContext.Provider value={{ sections, setSections }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
