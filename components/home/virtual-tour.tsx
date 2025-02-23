import { vr360, youtubeView } from "@/components/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";
import Image from "next/image";

export const VirtualTour = () => {
  return (
    <section className="relative bg-[#5c1414] py-24 sm:py-32">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center bg-no-repeat opacity-20" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Tham Quan Trực Tuyến
          </h2>
          <p className="mt-2 text-lg leading-8 text-white/90">
            Khám phá Văn Miếu - Quốc Tử Giám qua tour tham quan 360° và video
            giới thiệu
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <Card className="bg-white/10 backdrop-blur border-neutral-500/80">
            <CardContent className="p-6">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={vr360}
                  alt="360° Virtual Tour"
                  className="object-cover"
                  fill
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-[#5c1414] hover:bg-white/90"
                  >
                    Bắt đầu tour 360°
                  </Button>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Tour tham quan 360°
              </h3>
              <p className="mt-2 text-white/80">
                Khám phá chi tiết kiến trúc và không gian Văn Miếu - Quốc Tử
                Giám qua công nghệ thực tế ảo
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur border-neutral-500/80">
            <CardContent className="p-6">
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <Image
                  src={youtubeView}
                  alt="Video Introduction"
                  className="object-cover"
                  fill
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-16 w-16 rounded-full border-2 border-white bg-white/20"
                  >
                    <Play className="h-8 w-8 text-white" />
                  </Button>
                </div>
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">
                Video giới thiệu
              </h3>
              <p className="mt-2 text-white/80">
                Tìm hiểu lịch sử và ý nghĩa văn hóa của Văn Miếu - Quốc Tử Giám
                qua video giới thiệu
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
