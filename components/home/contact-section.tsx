import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MapPin, Phone, Mail } from "lucide-react";

const contactInfo = {
  address: "58 Quốc Tử Giám, Đống Đa, Hà Nội",
  phone: "(+84) 024 3747 2566",
  email: "vanmieu@gmail.com",
  hours: {
    weekday: "7:30 - 17:30",
    weekend: "7:30 - 18:00",
  },
};

export const ContactSection = () => {
  return (
    <section className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#5c1414]">
            Liên Hệ
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Thông Tin Tham Quan
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#5c1414]" />
                Địa chỉ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{contactInfo.address}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-[#5c1414]" />
                Điện thoại
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{contactInfo.phone}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-[#5c1414]" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{contactInfo.email}</CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#5c1414]" />
                Giờ mở cửa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Thứ 2 - Thứ 6: {contactInfo.hours.weekday}
                <br />
                Thứ 7 - CN: {contactInfo.hours.weekend}
              </CardDescription>
            </CardContent>
          </Card>
        </div>
        <div className="mx-auto mt-16 max-w-5xl">
          <Card>
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.1491350500296!2d105.82995902613764!3d21.026717930622052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9e82fe6137%3A0x27d124ae4fec1229!2zUXXhu5FjIFThu60gR2nDoW0sIMSQ4buRbmcgxJBhLCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1740319902109!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                loading="lazy"
                className="w-full"
              ></iframe>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
