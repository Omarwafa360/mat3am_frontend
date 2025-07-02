import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const SettingsTab = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    primaryColor: '#FF6347',
    secondaryColor: '#4682B4',
    fontFamily: 'Cairo',
    logoUrl: '',
    siteTitle: 'مطعم الأصالة',
    seoDescription: 'مطعم الأصالة: تجربة طعام فريدة بنكهات شرقية أصيلة.',
  });

  useEffect(() => {
    // هنا يمكنك جلب الإعدادات الحالية من الواجهة الخلفية إذا كانت موجودة
    // fetch('/api/admin/settings').then(res => res.json()).then(data => setSettings(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // هنا يمكنك إرسال الإعدادات إلى الواجهة الخلفية لحفظها
    // fetch('/api/admin/settings', { method: 'POST', body: JSON.stringify(settings) });
    toast({
      title: 'تم حفظ الإعدادات',
      description: 'تم تحديث إعدادات المظهر بنجاح.',
    });
    console.log('Saved Settings:', settings);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>إعدادات المظهر</CardTitle>
          <p className="text-muted-foreground text-sm">
            تحكم في الألوان، الخطوط، والشعارات الخاصة بموقعك.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="siteTitle" className="block mb-2">عنوان الموقع</Label>
            <Input
              id="siteTitle"
              name="siteTitle"
              type="text"
              value={settings.siteTitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="seoDescription" className="block mb-2">وصف SEO</Label>
            <Input
              id="seoDescription"
              name="seoDescription"
              type="text"
              value={settings.seoDescription}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label htmlFor="primaryColor" className="block mb-2">اللون الأساسي</Label>
            <Input
              id="primaryColor"
              name="primaryColor"
              type="color"
              value={settings.primaryColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="secondaryColor" className="block mb-2">اللون الثانوي</Label>
            <Input
              id="secondaryColor"
              name="secondaryColor"
              type="color"
              value={settings.secondaryColor}
              onChange={handleChange}
              className="h-10 w-full"
            />
          </div>
          <div>
            <Label htmlFor="fontFamily" className="block mb-2">الخط الأساسي</Label>
            <Input
              id="fontFamily"
              name="fontFamily"
              type="text"
              value={settings.fontFamily}
              onChange={handleChange}
              placeholder="مثال: Cairo, Arial, sans-serif"
            />
          </div>
          <div>
            <Label htmlFor="logoUrl" className="block mb-2">رابط الشعار (URL)</Label>
            <Input
              id="logoUrl"
              name="logoUrl"
              type="text"
              value={settings.logoUrl}
              onChange={handleChange}
              placeholder="مثال: https://example.com/logo.png"
            />
          </div>
          <Button onClick={handleSave} className="w-full">
            حفظ الإعدادات
          </Button>
        </CardContent>
      </Card>
    </motion.div>
   );
};

export default SettingsTab;
