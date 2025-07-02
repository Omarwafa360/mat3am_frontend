import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // تأكد من استيراد الأيقونات

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactInfo, setContactInfo] = useState([]); // جديد: لإضافة معلومات التواصل

  useEffect(() => {
    // جديد: جلب معلومات التواصل
    fetch('/api/contact/information')
      .then(res => res.json())
      .then(data => setContactInfo(data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage('');

    // تحقق من تعبئة الحقول المطلوبة (يمكن تطويره لاحقًا)
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage('الرجاء تعبئة جميع الحقول المطلوبة.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        setStatusMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريبًا.');
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setStatusMessage('حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى.');
      }
    } catch (error) {
      setStatusMessage('حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقًا.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // دالة مساعدة لعرض الأيقونات بناءً على الاسم
  const getIconComponent = (iconName) => {
    switch (iconName) {
      case 'MapPin': return <MapPin className="w-6 h-6 text-primary" />;
      case 'Phone': return <Phone className="w-6 h-6 text-primary" />;
      case 'Mail': return <Mail className="w-6 h-6 text-primary" />;
      case 'Clock': return <Clock className="w-6 h-6 text-primary" />;
      default: return null;
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>تواصل معنا | مطعم الأصالة</title>
        <meta name="description" content="اتصل بنا لطلب المعلومات أو الحجز أو لأي استفسار آخر." />
      </Helmet>

      <PageHeader
        title="تواصل معنا"
        subtitle="يسعدنا استلام استفساراتكم وملاحظاتكم عبر النموذج أدناه."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-4">
        {/* نموذج الاتصال */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 font-semibold">الاسم الكامل *</label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block mb-1 font-semibold">رقم الهاتف</label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">البريد الإلكتروني *</label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="subject" className="block mb-1 font-semibold">الموضوع</label>
            <Input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-semibold">الرسالة *</label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={isSubmitting}
              rows={5}
            />
          </div>

          {statusMessage && (
            <p className={`text-center font-semibold ${statusMessage.includes('نجاح') ? 'text-green-600' : 'text-red-600'}`}>
              {statusMessage}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
          </Button>
        </form>

        {/* معلومات الاتصال */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold mb-4">معلومات الاتصال</h3>
          {contactInfo.map((info) => (
            <div key={info.id} className="flex items-start gap-4 p-4 border rounded-lg shadow-sm">
              <div className="flex-shrink-0 mt-1">
                {getIconComponent(info.icon_name)}
              </div>
              <div>
                <h4 className="font-semibold text-lg">{info.title}</h4>
                <p className="text-muted-foreground whitespace-pre-line">{info.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Contact;
