import { Compass, Ticket, Calendar } from "lucide-react";
import Link from "next/link";

const features = [
  {
    name: "Khám Phá",
    description:
      "Tìm hiểu về lịch sử và kiến trúc độc đáo của Văn Miếu Quốc Tử Giám",
    icon: Compass,
    href: "/explore",
  },
  {
    name: "Giá Vé",
    description: "Thông tin chi tiết về giá vé tham quan và các gói dịch vụ",
    icon: Ticket,
    href: "/tickets",
  },
  {
    name: "Sự Kiện",
    description: "Các sự kiện và hoạt động văn hóa đang diễn ra tại Văn Miếu",
    icon: Calendar,
    href: "/events",
  },
];

export default function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-3xl mb-8 font-semibold leading-7 text-[#5c1414]">
            Chào mừng quý khách
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Khám phá Văn Miếu Quốc Tử Giám
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Nơi hội tụ tinh hoa văn hóa và giáo dục Việt Nam qua hàng nghìn năm
            lịch sử
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <Link key={feature.name} href={feature.href} className="group">
                <div className="flex flex-col transition-transform duration-300 group-hover:-translate-y-2">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon
                      className="h-5 w-5 flex-none text-[#5c1414]"
                      aria-hidden="true"
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              </Link>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
