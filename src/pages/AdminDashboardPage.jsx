import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import DataTable from "@/pages/admin/DataTable";
import SettingsTab from "@/pages/admin/SettingsTab";
import LayoutEditorTab from "@/pages/admin/LayoutEditorTab";

const AdminDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("dataTable");
  const { toast } = useToast();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const showSuccessToast = () => {
    toast({
      title: "تم التحديث بنجاح!",
      description: "تم حفظ التغييرات.",
      status: "success",
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المسؤول</h1>
      <div className="flex space-x-4 mb-6">
        <Button onClick={() => handleTabChange("dataTable")} variant={activeTab === "dataTable" ? "default" : "outline"}>
          جدول البيانات
        </Button>
        <Button onClick={() => handleTabChange("settings")} variant={activeTab === "settings" ? "default" : "outline"}>
          الإعدادات
        </Button>
        <Button onClick={() => handleTabChange("layoutEditor")} variant={activeTab === "layoutEditor" ? "default" : "outline"}>
          محرر التخطيط
        </Button>
      </div>

      {activeTab === "dataTable" && <DataTable />}
      {activeTab === "settings" && <SettingsTab onSave={showSuccessToast} />}
      {activeTab === "layoutEditor" && <LayoutEditorTab onSave={showSuccessToast} />}
    </div>
  );
};

export default AdminDashboardPage;
