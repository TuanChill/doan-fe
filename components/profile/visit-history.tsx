import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users, Ticket } from "lucide-react";

// Mock visit history data
const VISIT_HISTORY = [
  {
    id: 1,
    date: "2023-12-15",
    time: "10:30",
    type: "Tham quan thường",
    visitors: 1,
    areas: ["Khu trưng bày chiến tranh chống Pháp", "Khu trưng bày vũ khí"],
  },
  {
    id: 2,
    date: "2023-11-20",
    time: "14:15",
    type: "Sự kiện đặc biệt",
    visitors: 2,
    areas: ["Khu trưng bày ngoài trời", "Khu trưng bày hiện vật lịch sử"],
  },
  {
    id: 3,
    date: "2023-09-18",
    time: "09:20",
    type: "Tham quan thường",
    visitors: 4,
    areas: [
      "Khu trưng bày chiến tranh chống Mỹ",
      "Khu trưng bày vũ khí",
      "Khu trưng bày ngoài trời",
    ],
  },
  {
    id: 4,
    date: "2023-08-30",
    time: "13:00",
    type: "Tour hướng dẫn đặc biệt",
    visitors: 1,
    areas: ["Toàn bộ bảo tàng"],
  },
];

interface VisitHistoryProps {
  userData: {
    username: string;
  };
}

export default function VisitHistory({ userData }: VisitHistoryProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <Ticket className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Lịch sử tham quan</h3>
            <p className="text-gray-600">Các lần tham quan bảo tàng của bạn</p>
          </div>
        </div>

        <div className="space-y-6">
          {VISIT_HISTORY.map((visit) => (
            <div key={visit.id} className="border rounded-lg overflow-hidden">
              <div className="bg-blue-50 p-4 border-b flex justify-between items-center">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  <span className="font-medium">{formatDate(visit.date)}</span>
                  <Clock className="h-5 w-5 ml-4 mr-2 text-blue-600" />
                  <span>{visit.time}</span>
                </div>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {visit.type}
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-center mb-3">
                  <Users className="h-5 w-5 mr-2 text-gray-600" />
                  <span>Số người: {visit.visitors}</span>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Khu vực đã tham quan:</h4>
                    <ul className="space-y-1">
                      {visit.areas.map((area, index) => (
                        <li key={index} className="text-sm flex items-center">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                          {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
