"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  Phone,
  Award,
  Edit2,
  Save,
  X,
  Clock,
  Ticket,
  Gift,
} from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import ProfileInformation from "@/components/profile/profile-information";
import ProfileEditForm from "@/components/profile/profile-edit-form";
import PointsHistory from "@/components/profile/points-history";
import VisitHistory from "@/components/profile/visit-history";
import { logo } from "@/components/image";
import { get } from "lodash";
import { useUserStore } from "@/stores/user-store";
import { User as UserType } from "@/types/user";
import { updateUser } from "@/request/auth";
import { useSnackBarStore } from "@/stores/snackbar-store";

export default function ProfilePage() {
  const { user, setUserInfo } = useUserStore();
  const { success, error } = useSnackBarStore();

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveProfile = async (updatedData: typeof user) => {
    if (updatedData && user?.id) {
      try {
        console.log(updatedData);
        await updateUser(user?.id, updatedData);
        setUserInfo(updatedData);
        setIsEditing(false);
        success("Cập nhật thông tin thành công");
      } catch (err) {
        error("Cập nhật thông tin thất bại");
        console.log(err);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[30vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
        <motion.div
          className="absolute inset-0 bg-black/40 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/placeholder.svg?height=1080&width=1920')",
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Tài khoản của tôi
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4">
                Quản lý thông tin cá nhân và theo dõi điểm tích lũy
              </p>
              <div className="h-1 w-20 bg-red-700 mb-6"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Profile Header */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-olive-800">
                  <img
                    src={logo.src}
                    alt={get(user, "fullName", "")}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">
                  {get(user, "fullName", "--")}
                </h2>
                <p className="text-gray-600 mb-2">
                  @{get(user, "username", "--")}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3">
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-1" />
                    <span className="text-sm">{get(user, "email", "--")}</span>
                  </div>
                  {get(user, "phoneNumber", "--") && (
                    <div className="flex items-center text-gray-700">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="text-sm">
                        {get(user, "phoneNumber", "--")}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      Thành viên từ:
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("vi-VN")
                        : "Không có thông tin"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center bg-olive-50 p-4 rounded-lg border border-olive-200">
                <div className="text-3xl font-bold text-olive-800">
                  {get(user, "point", 0)}
                </div>
                <div className="text-sm text-olive-700">Điểm tích lũy</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
                >
                  <Gift className="h-4 w-4 mr-1" /> Đổi quà
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="mb-8">
                <TabsTrigger value="profile" className="text-sm">
                  <User className="h-4 w-4 mr-2" />
                  Thông tin cá nhân
                </TabsTrigger>
                <TabsTrigger value="points" className="text-sm">
                  <Award className="h-4 w-4 mr-2" />
                  Điểm tích lũy
                </TabsTrigger>
                <TabsTrigger value="visits" className="text-sm">
                  <Ticket className="h-4 w-4 mr-2" />
                  Lịch sử tham quan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Thông tin cá nhân</h3>
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-olive-800 text-olive-800 hover:bg-olive-800 hover:text-white"
                        >
                          <Edit2 className="h-4 w-4 mr-2" /> Chỉnh sửa
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleCancelEdit}
                            variant="outline"
                            size="sm"
                          >
                            <X className="h-4 w-4 mr-1" /> Hủy
                          </Button>
                          <Button
                            form="profile-form"
                            type="submit"
                            className="bg-olive-800 hover:bg-olive-900"
                            size="sm"
                          >
                            <Save className="h-4 w-4 mr-1" /> Lưu
                          </Button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <ProfileEditForm
                        user={user as UserType}
                        onSave={handleSaveProfile}
                      />
                    ) : (
                      <ProfileInformation user={user as UserType} />
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="points">
                <PointsHistory userData={user as UserType} />
              </TabsContent>

              <TabsContent value="visits">
                <VisitHistory userData={user as UserType} />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>
    </div>
  );
}
