import { architectImage, historyImage } from "@/components/image";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export const HistorySection = () => {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#5c1414]">
            Lịch Sử
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Di Sản Văn Hóa Nghìn Năm
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:mt-20 lg:max-w-none lg:grid-cols-2">
          <Card className="bg-white/50 border-none shadow-none">
            <CardContent className="p-0">
              <div className="relative h-[300px] overflow-hidden rounded-xl">
                <Image
                  src={historyImage}
                  alt="Văn Miếu xưa"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900">Lịch sử</h3>
                <p className="mt-4 text-gray-600 leading-7">
                  Văn Miếu được xây dựng năm 1070 dưới triều vua Lý Thánh Tông.
                  Đây là nơi thờ Khổng Tử, các bậc hiền triết và là trường Quốc
                  Tử Giám - trường đại học đầu tiên của Việt Nam.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/50 border-none shadow-none">
            <CardContent className="p-0">
              <div className="relative h-[300px] overflow-hidden rounded-xl">
                <Image
                  src={architectImage}
                  alt="Kiến trúc Văn Miếu"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900">
                  Kiến trúc
                </h3>
                <p className="mt-4 text-gray-600 leading-7">
                  Văn Miếu - Quốc Tử Giám là quần thể kiến trúc đặc sắc, gồm
                  nhiều công trình như Văn Miếu, Quốc Tử Giám, Khuê Văn Các, và
                  82 bia Tiến sĩ - di sản văn hóa độc đáo của dân tộc.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
