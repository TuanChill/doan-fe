"use client";

import { useState } from "react";
import { MapPin, Clock, Phone, Mail, ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Bảo tàng có những khu vực trưng bày nào?",
    answer:
      "Bảo tàng có các khu vực trưng bày gồm: Khu vực lịch sử, Khu nghệ thuật, Khu di sản văn hóa, và Khu triển lãm tạm thời.",
  },
  {
    question: "Giờ mở cửa của bảo tàng là khi nào?",
    answer: "Bảo tàng mở cửa từ 8:00 - 17:00 hàng ngày, trừ thứ Hai hàng tuần.",
  },
  {
    question: "Có những hiện vật nổi bật nào trong bảo tàng?",
    answer:
      "Một số hiện vật nổi bật gồm: Bản đồ cổ, Bức tranh quý hiếm, Đồ tạo tác từ thời phong kiến và Tượng điêu khắc cổ.",
  },
  {
    question: "Lịch sử hình thành của bảo tàng?",
    answer:
      "Bảo tàng được thành lập vào năm 1980 với mục đích bảo tồn và phát huy các giá trị lịch sử, văn hóa của dân tộc.",
  },
  {
    question: "Làm thế nào để đến bảo tàng bằng phương tiện công cộng?",
    answer:
      "Bạn có thể đến bảo tàng bằng xe buýt số 10, 22, 36 hoặc đi tàu điện ngầm đến ga trung tâm và đi bộ khoảng 10 phút.",
  },
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-gray-50 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-gray-900 mb-2">
        CÂU HỎI THƯỜNG GẶP
      </h2>
      <div className="divide-y divide-gray-200">
        {faqs.map((faq, index) => (
          <div key={index} className="py-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center text-base font-semibold text-gray-900 py-1"
            >
              {faq.question}
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            {openIndex === index && (
              <p className="mt-1 text-gray-700 text-sm">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors: any = {};
    if (!form.name.trim()) newErrors.name = "Họ và tên không được để trống";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email không hợp lệ";
    if (form.phone && !/^\d{10,11}$/.test(form.phone))
      newErrors.phone = "Số điện thoại không hợp lệ";
    if (!form.subject.trim()) newErrors.subject = "Tiêu đề không được để trống";
    if (!form.message.trim())
      newErrors.message = "Nội dung không được để trống";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Gửi thông tin thành công!");
    }
  };

  return (
    <div className="bg-white">
      <div className="relative w-full h-72 md:h-96 lg:h-[500px] overflow-hidden">
        <img
          src="https://xdcs.cdnchinhphu.vn/446259493575335936/2024/11/6/bt-17308704367321003201191.jpg"
          alt="Di tích lịch sử"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              LIÊN HỆ
            </h1>
            <h3 className="text-lg md:text-xl text-white mt-2">
              Chúng tôi luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của quý
              khách!
            </h3>
          </div>
          {/* Hộp chứa các nút */}
          <div className="absolute bottom-20 w-full flex justify-center gap-x-16">
            {/* Nút bên trái */}
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-lg">
              📞 <span>(024) 3733 4464</span>
            </button>

            {/* Nút giữa */}
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-lg">
              📧 <span>info@btlsqsvn.vn</span>
            </button>

            {/* Nút bên phải */}
            <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow-lg">
              📍 <span>28A Điện Biên Phủ, Ba Đình, Hà Nội</span>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FAQAccordion />
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              GỬI THÔNG TIN LIÊN HỆ
            </h2>
            <form className="space-y-3" onSubmit={handleSubmit}>
              {Object.entries(form).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">
                    {key === "message"
                      ? "Nội dung"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                    {key !== "phone" && (
                      <span className="text-red-500"> *</span>
                    )}
                  </label>
                  {key === "message" ? (
                    <textarea
                      className="w-full h-16 border rounded-lg p-2"
                      value={value}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  ) : (
                    <input
                      type={
                        key === "email"
                          ? "email"
                          : key === "phone"
                          ? "tel"
                          : "text"
                      }
                      className="w-full h-10 border rounded-lg p-2"
                      value={value}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                    />
                  )}
                  {errors[key as keyof typeof errors] && (
                    <p className="text-red-500 text-xs">
                      {errors[key as keyof typeof errors]}
                    </p>
                  )}
                </div>
              ))}
              <button className="w-full h-10 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
                Gửi thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
