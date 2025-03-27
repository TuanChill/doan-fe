import { z } from "zod";

// Create zod schema for form validation
export const formSchema = z.object({
    fullName: z.string().min(2, { message: "Họ tên phải có ít nhất 2 ký tự" }),
    email: z.string().email({ message: "Email không hợp lệ" }),
    phoneNumber: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
    visitDate: z.date({ required_error: "Vui lòng chọn ngày tham quan" }),
    adultTickets: z.coerce.number().min(0).default(0),
    childTickets: z.coerce.number().min(0).default(0),
    seniorTickets: z.coerce.number().min(0).default(0),
    groupTickets: z.coerce.number().min(0).default(0),
    paymentMethod: z.enum(["vnpay", "momo"]),
    agree: z.boolean().refine((val) => val === true, {
      message: "Bạn phải đồng ý với điều khoản và điều kiện",
    }),
});
  
export type TicketFormValues = z.infer<typeof formSchema>;