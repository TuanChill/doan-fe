import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
} from "lucide-react";
import { User } from "@/types/user";
import { get } from "lodash";

interface ProfileInformationProps {
  user: User;
}

export default function ProfileInformation({ user }: ProfileInformationProps) {
  // Format date of birth
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  // Translate gender
  const translateGender = (gender: string) => {
    switch (gender) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      case "other":
        return "Khác";
      default:
        return gender;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center mr-3 flex-shrink-0">
              <UserIcon className="h-5 w-5 text-olive-800" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Tên đăng nhập
              </h4>
              <p className="font-medium">{get(user, "username", "--")}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center mr-3 flex-shrink-0">
              <Mail className="h-5 w-5 text-olive-800" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Email</h4>
              <p className="font-medium">{get(user, "email", "--")}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center mr-3 flex-shrink-0">
              <Phone className="h-5 w-5 text-olive-800" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">
                Số điện thoại
              </h4>
              <p className="font-medium">
                {user?.phoneNumber ? get(user, "phoneNumber", "--") : "--"}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center mr-3 flex-shrink-0">
              <Calendar className="h-5 w-5 text-olive-800" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Ngày sinh</h4>
              <p className="font-medium">
                {user?.dateOfBirth ? formatDate(user.dateOfBirth) : "--"}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center mr-3 flex-shrink-0">
              <Users className="h-5 w-5 text-olive-800" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Giới tính</h4>
              <p className="font-medium">
                {user?.gender ? translateGender(user.gender) : "--"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-start pt-4 border-t border-gray-200">
        <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center mr-3 flex-shrink-0">
          <MapPin className="h-5 w-5 text-olive-800" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-500">Địa chỉ</h4>
          <p className="font-medium">
            {user?.address ? get(user, "address", "--") : "--"}
          </p>
        </div>
      </div>
    </div>
  );
}
