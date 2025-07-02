import React from "react";

const DataTable = () => {
  // مثال بيانات ثابتة
  const data = [
    { id: 1, name: "المنتج 1", price: 100 },
    { id: 2, name: "المنتج 2", price: 200 },
    { id: 3, name: "المنتج 3", price: 300 },
  ];

  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">الرقم</th>
          <th className="border border-gray-300 p-2">الاسم</th>
          <th className="border border-gray-300 p-2">السعر</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center hover:bg-gray-50">
            <td className="border border-gray-300 p-2">{item.id}</td>
            <td className="border border-gray-300 p-2">{item.name}</td>
            <td className="border border-gray-300 p-2">{item.price} ر.س</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
