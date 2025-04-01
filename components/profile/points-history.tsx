import { Card, CardContent } from "@/components/ui/card";
import { Award, ChevronUp, ChevronDown, Calendar, Clock } from "lucide-react";
import { get } from "lodash";
import { useEffect, useState } from "react";
import { getUserPointsHistory } from "@/request/action";
import { useUserStore } from "@/stores/user-store";
// Mock points history data
const POINTS_HISTORY = [
  {
    id: 1,
    date: "2023-12-15",
    type: "earn",
    amount: 50,
    description: "Tham quan bảo tàng",
    time: "10:30",
  },
  {
    id: 2,
    date: "2023-11-20",
    type: "earn",
    amount: 100,
    description: "Tham gia sự kiện kỷ niệm 70 năm chiến thắng Điện Biên Phủ",
    time: "14:15",
  },
  {
    id: 3,
    date: "2023-10-05",
    type: "spend",
    amount: 150,
    description: "Đổi quà lưu niệm",
    time: "16:45",
  },
  {
    id: 4,
    date: "2023-09-18",
    type: "earn",
    amount: 75,
    description: "Tham quan bảo tàng",
    time: "09:20",
  },
  {
    id: 5,
    date: "2023-08-30",
    type: "earn",
    amount: 175,
    description: "Tham gia tour hướng dẫn đặc biệt",
    time: "13:00",
  },
];

// Mock rewards data
const REWARDS = [
  {
    id: 1,
    name: "Vé tham quan",
    points: 2000,
    description: "Vé tham quan bảo tàng",
    image:
      "https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/11/hien-vat-tai-bao-tang-lich-su-quan-su-viet-nam.jpg",
  },
  // {
  //   id: 2,
  //   name: "Sách lịch sử quân sự",
  //   points: 150,
  //   description: "Sách về lịch sử quân sự Việt Nam",
  //   image: "/placeholder.svg?height=100&width=100",
  // },
  // {
  //   id: 3,
  //   name: "Mô hình xe tăng",
  //   points: 300,
  //   description: "Mô hình xe tăng T-54 tỉ lệ 1:35",
  //   image: "/placeholder.svg?height=100&width=100",
  // },
];

interface PointsHistoryProps {
  userData: {
    point: number;
  };
}

export default function PointsHistory({ userData }: PointsHistoryProps) {
  const [pointsHistory, setPointsHistory] = useState([]);
  const { user } = useUserStore();

  const handleGetPointsHistory = async () => {
    try {
      if (!user?.id) return;
      const res = await getUserPointsHistory(user?.id);
      setPointsHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetPointsHistory();
  }, []);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <div className="space-y-8">
      {/* Points Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
              <Award className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Điểm tích lũy</h3>
              <p className="text-gray-600">
                Tích điểm khi tham quan và tham gia sự kiện tại bảo tàng
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-olive-50 p-4 rounded-lg border border-olive-200">
              <div className="text-sm text-olive-700 mb-1">
                Tổng điểm hiện tại
              </div>
              <div className="text-3xl font-bold text-olive-800">
                {get(userData, "point", 0)}
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-sm text-green-700 mb-1">
                Điểm đã tích lũy
              </div>
              <div className="text-3xl font-bold text-green-800">
                {get(userData, "point", 0)}
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="text-sm text-red-700 mb-1">Điểm đã sử dụng</div>
              <div className="text-3xl font-bold text-red-800">
                {get(userData, "point", 0)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Points History */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6">Lịch sử điểm</h3>

          <div className="space-y-4">
            {pointsHistory?.map((item) => (
              <div
                key={get(item, "id", 0)}
                className="flex items-start p-4 bg-gray-50 rounded-lg"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                    get(item, "point", 0) > 0 ? "bg-green-100" : "bg-red-100"
                  }`}
                >
                  {get(item, "point", 0) > 0 ? (
                    <ChevronUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-red-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{get(item, "name", "")}</h4>
                    <span
                      className={`font-bold ${
                        get(item, "point", 0) > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {get(item, "point", 0) > 0 ? "+" : "-"}
                      {get(item, "point", 0)} điểm
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(get(item, "createdAt", ""))}</span>
                    <Clock className="h-3 w-3 ml-3 mr-1" />
                    <span>
                      {new Date(
                        get(item, "createdAt", "")
                      ).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Available Rewards */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-6">Quà có thể đổi</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {REWARDS.map((reward) => (
              <div
                key={reward.id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="bg-gray-100 flex items-center justify-center">
                  <img
                    src={reward.image}
                    alt={reward.name}
                    className="object-contain"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="font-medium">{reward.name}</h4>
                  {/* <p className="text-sm text-gray-600 mb-2">
                    {reward.description}
                  </p> */}
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-amber-600">
                      {reward.points} điểm
                    </span>
                    <button
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        get(userData, "point", 0) >= reward.points
                          ? "bg-olive-800 text-white hover:bg-olive-900"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={get(userData, "point", 0) < reward.points}
                    >
                      Đổi quà
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
