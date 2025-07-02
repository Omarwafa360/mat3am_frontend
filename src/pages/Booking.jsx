import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import AnimatedPage from '@/components/shared/AnimatedPage';
import PageHeader from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    full_name: '',
    phone_number: '',
    email: '',
    reservation_date: '',
    reservation_time: '',
    guests_count: '',
    special_notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // تعديل: ربط النموذج بـ API الحجز الجديدة
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: 'تم إرسال طلب الحجز',
          description: 'تم استلام طلب حجزك بنجاح. سنتواصل معك قريباً.',
          variant: 'success',
        });
        setFormData({
          full_name: '',
          phone_number: '',
          email: '',
          reservation_date: '',
          reservation_time: '',
          guests_count: '',
          special_notes: '',
        });
      } else {
        toast({
          title: 'خطأ في إرسال الطلب',
          description: result.message || 'حدث خطأ أثناء إرسال طلب الحجز. الرجاء المحاولة مرة أخرى.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Booking form submission error:', error);
      toast({
        title: 'خطأ في الاتصال',
        description: 'حدث خطأ في الاتصال بالخادم. الرجاء المحاولة لاحقاً.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
      <Helmet>
        <title>حجز طاولة | مطعم الأصالة</title>
        <meta name="description" content="احجز طاولتك في مطعم الأصالة بسهولة وسرعة. استمتع بأفضل الأجواء وأشهى الأطباق." />
      </Helmet>

      <PageHeader
        title="احجز طاولتك"
        subtitle="املأ النموذج التالي لحجز طاولتك في مطعم الأصالة."
      />

      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6 rtl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="full_name" className="block mb-1 font-semibold">الاسم الكامل *</label>
            <Input
              id="full_name"
              name="full_name"
              type="text"
              placeholder="اسمك الكامل"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone_number" className="block mb-1 font-semibold">رقم الهاتف *</label>
            <Input
              id="phone_number"
              name="phone_number"
              type="tel"
              placeholder="رقم هاتفك"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">البريد الإلكتروني *</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <label htmlFor="reservation_date" className="block mb-1 font-semibold">تاريخ الحجز *</label>
            <Input
              id="reservation_date"
              name="reservation_date"
              type="date"
              value={formData.reservation_date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="reservation_time" className="block mb-1 font-semibold">وقت الحجز *</label>
            <Input
              id="reservation_time"
              name="reservation_time"
              type="time"
              value={formData.reservation_time}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="guests_count" className="block mb-1 font-semibold">عدد الضيوف *</label>
            <Input
              id="guests_count"
              name="guests_count"
              type="number"
              min="1"
              max="50"
              value={formData.guests_count}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label htmlFor="special_notes" className="block mb-1 font-semibold">ملاحظات إضافية</label>
          <Textarea
            id="special_notes"
            name="special_notes"
            placeholder="إذا كان لديك ملاحظات خاصة، اكتبها هنا..."
            rows={4}
            value={formData.special_notes}
            onChange={handleChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'جاري الإرسال...' : 'إرسال طلب الحجز'}
        </Button>
      </form>
    </AnimatedPage>
  );
};

export default Booking;
