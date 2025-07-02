import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import AnimatedPage from "@/components/shared/AnimatedPage";
import PageHeader from "@/components/shared/PageHeader";
import { motion } from "framer-motion";

const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch("/api/gallery/images");
        if (!res.ok) throw new Error("فشل تحميل الصور");
        const data = await res.json();
        setGalleryImages(data);
      } catch (err) {
        setError(err.message || "حدث خطأ ما");
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  if (loading) {
    return <AnimatedPage><div className="text-center text-lg">جاري تحميل الصور...</div></AnimatedPage>;
  }

  if (error) {
    return <AnimatedPage><div className="text-center text-red-500 text-lg">خطأ: {error}</div></AnimatedPage>;
  }

  return (
    <AnimatedPage>
      <Helmet>
        <title>معرض الصور | مطعم الأصالة</title>
        <meta name="description" content="استعرض أجمل صور مطعم الأصالة وأطباقه الشهية وأجوائه الرائعة." />
      </Helmet>

      <PageHeader
        title="معرض الصور"
        subtitle="لحظات من الجمال واللذة في مطعم الأصالة."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={image.image_url}
              alt={image.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="text-white text-center p-4">
                <h3 className="text-xl font-semibold">{image.title}</h3>
                <p className="text-sm">{image.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatedPage>
  );
};

export default Gallery;
