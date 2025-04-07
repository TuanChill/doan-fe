"use client";

import { get, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
// Define the form schema with validation
const formSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Tên đăng nhập phải có ít nhất 6 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
  phoneNumber: z
    .string()
    .refine((val) => /(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(val), {
      message: "Số điện thoại không hợp lệ",
    }),
  address: z.string().min(5, { message: "Địa chỉ phải có ít nhất 5 ký tự" }),
  dateOfBirth: z.date().optional(),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Vui lòng chọn giới tính",
  }),
});

interface ProfileEditFormProps {
  user: User;
  onSave: (data: any) => void;
}

export default function ProfileEditForm({
  user,
  onSave,
}: ProfileEditFormProps) {
  // Initialize form with current user data
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: get(user, "username", ""),
      fullName: get(user, "fullName", ""),
      email: get(user, "email", ""),
      dateOfBirth: get(user, "dateOfBirth")
        ? new Date(get(user, "dateOfBirth"))
        : undefined,
      gender: get(user, "gender", "male"),
      address: get(user, "address", ""),
      phoneNumber: get(user, "phoneNumber", ""),
    },
  });

  const onSubmit = (data: any) => {
    onSave(data);
  };

  return (
    <form
      id="profile-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="username">Tên đăng nhập</Label>
          <Input
            id="username"
            {...form.register("username")}
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("username", value.trim());
            }}
            className="mt-1"
          />
          {form.formState.errors.username && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.username?.message?.toString() || ""}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="full_name">Họ và tên</Label>
          <Input
            id="full_name"
            {...form.register("fullName")}
            className="mt-1"
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("fullName", value.trim());
            }}
          />
          {form.formState.errors.fullName && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.fullName?.message?.toString() || ""}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            className="mt-1"
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("email", value.trim());
            }}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.email?.message?.toString() || ""}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Số điện thoại</Label>
          <Input
            id="phone"
            {...form.register("phoneNumber")}
            className="mt-1"
            onChange={(e) => {
              const value = e.target.value;
              form.setValue("phoneNumber", value.trim());
            }}
          />
          {form.formState.errors.phoneNumber && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.phoneNumber?.message?.toString() || ""}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="date_of_birth">Ngày sinh</Label>
          <div className="mt-1">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !form.watch("dateOfBirth") && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("dateOfBirth") ? (
                    format(form.watch("dateOfBirth") as Date, "PPP", {
                      locale: vi,
                    })
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={form.watch("dateOfBirth")}
                  onSelect={(date) =>
                    form.setValue("dateOfBirth", date as Date)
                  }
                  disabled={(date) => date > new Date()}
                  initialFocus
                  locale={vi}
                />
              </PopoverContent>
            </Popover>
          </div>
          {form.formState.errors.dateOfBirth && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.dateOfBirth?.message?.toString() || ""}
            </p>
          )}
        </div>

        <div>
          <Label>Giới tính</Label>
          <RadioGroup
            defaultValue={user.gender ?? undefined}
            onValueChange={(value) =>
              form.setValue("gender", value as "male" | "female" | "other")
            }
            className="flex space-x-4 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male" className="cursor-pointer">
                Nam
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="female" className="cursor-pointer">
                Nữ
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="cursor-pointer">
                Khác
              </Label>
            </div>
          </RadioGroup>
          {form.formState.errors.gender && (
            <p className="text-sm text-red-500 mt-1">
              {form.formState.errors.gender?.message?.toString() || ""}
            </p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="address">Địa chỉ</Label>
        <textarea
          id="address"
          {...form.register("address")}
          rows={3}
          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-olive-800"
        ></textarea>
        {form.formState.errors.address && (
          <p className="text-sm text-red-500 mt-1">
            {form.formState.errors.address?.message?.toString() || ""}
          </p>
        )}
      </div>
    </form>
  );
}
