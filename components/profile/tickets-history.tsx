"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Ticket,
  Calendar,
  Clock,
  Download,
  Share2,
  QrCode,
  Eye,
  CheckCircle,
  AlertCircle,
  Search,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn, formatCurrency } from "@/lib/utils";
import { getAllInvoice } from "@/request/invoice";
import { get } from "lodash";
import AnimatedSection from "@/components/ui/animated-section";

export default function TicketsHistory() {
  const [filter, setFilter] = useState<string>("all");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);

  const handleGetInvoice = async () => {
    try {
      const res = await getAllInvoice(1, 10);
      setInvoices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetInvoice();
  }, [filter]);

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "valid":
        return <Badge className="bg-green-500">Còn hạn</Badge>;
      case "used":
        return <Badge className="bg-blue-500">Đã sử dụng</Badge>;
      case "expired":
        return <Badge className="bg-gray-500">Hết hạn</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Đã hủy</Badge>;
      default:
        return <Badge>Không xác định</Badge>;
    }
  };

  // Get source badge
  const getSourceBadge = (source: string, pointsUsed: number) => {
    if (source === "purchase") {
      return <Badge variant="outline">Mua vé</Badge>;
    } else {
      return (
        <Badge
          variant="outline"
          className="bg-amber-50 text-amber-800 border-amber-200"
        >
          Đổi điểm ({pointsUsed})
        </Badge>
      );
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold flex items-center">
            <Ticket className="h-5 w-5 mr-2 text-olive-800" />
            Vé của tôi
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Tất cả</TabsTrigger>
            {/* <TabsTrigger value="valid">Còn hạn</TabsTrigger>
            <TabsTrigger value="used">Đã sử dụng</TabsTrigger>
            <TabsTrigger value="expired">Hết hạn</TabsTrigger> */}
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {invoices.length > 0 ? (
              <div className="space-y-6">
                {invoices.map((item) => (
                  <AnimatedSection
                    key={get(item, "documentId", 0)}
                    animation="fadeUp"
                  >
                    <div>
                      <div className="space-y-3">
                        <TicketItem
                          ticket={item}
                          onViewDetails={() => setSelectedTicket(item)}
                        />
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Ticket className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium mb-2">Không tìm thấy vé</h3>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Ticket Detail Dialog */}
        {selectedTicket && (
          <Dialog
            open={!!selectedTicket}
            onOpenChange={(open) => !open && setSelectedTicket(null)}
          >
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-xl">Chi tiết vé</DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Vé tham quan</h3>
                      <p className="text-sm text-gray-600">
                        Mã vé: {get(selectedTicket, "documentId", "N/A")}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {/* {getStatusBadge(selectedTicket.status)}
                      <div className="mt-1">
                        {getSourceBadge(
                          selectedTicket.source,
                          selectedTicket.pointsUsed
                        )}
                      </div> */}
                    </div>
                  </div>

                  <div className="flex justify-center mb-4">
                    <div className="bg-white p-3 rounded-lg border">
                      <img
                        src={get(selectedTicket, "ticketUrl")}
                        alt="QR Code"
                        className="w-48 h-48 object-contain"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày tham quan:</span>
                      <span className="font-medium">
                        {get(selectedTicket, "invoice_details[0].validDate")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ngày mua/đổi:</span>
                      <span className="font-medium">
                        {get(selectedTicket, "createdAt")}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số lượng:</span>
                      <span className="font-medium">
                        {get(selectedTicket, "invoice_details.length")} vé
                      </span>
                    </div>
                    {/* {selectedTicket.source === "purchase" ? (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Giá tiền:</span>
                        <span className="font-medium">
                          {selectedTicket.price.toLocaleString("vi-VN")} VNĐ
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Điểm đã dùng:</span>
                        <span className="font-medium">
                          {selectedTicket.pointsUsed} điểm
                        </span>
                      </div>
                    )} */}
                  </div>
                </div>

                {/* {selectedTicket.status === "valid" && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-green-800">Vé hợp lệ</p>
                        <p className="text-sm text-green-700">
                          Vé này có thể sử dụng để tham quan bảo tàng vào ngày{" "}
                          {format(selectedTicket.visitDate, "dd/MM/yyyy", {
                            locale: vi,
                          })}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )} */}

                {/* {selectedTicket.status === "used" && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-blue-800">
                          Vé đã sử dụng
                        </p>
                        <p className="text-sm text-blue-700">
                          Vé này đã được sử dụng để tham quan bảo tàng vào ngày{" "}
                          {format(selectedTicket.visitDate, "dd/MM/yyyy", {
                            locale: vi,
                          })}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedTicket.status === "expired" && (
                  <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 mr-2 text-gray-600 mt-0.5" />
                      <div>
                        <p className="font-medium text-gray-800">
                          Vé đã hết hạn
                        </p>
                        <p className="text-sm text-gray-700">
                          Vé này đã hết hạn và không thể sử dụng để tham quan
                          bảo tàng.
                        </p>
                      </div>
                    </div>
                  </div>
                )} */}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTicket(null)}
                  >
                    Đóng
                  </Button>

                  {/* {selectedTicket.status === "valid" && (
                    <div className="space-x-2">
                      <Button variant="outline">
                        <Share2 className="h-4 w-4 mr-2" /> Chia sẻ
                      </Button>
                      <Button>
                        <Download className="h-4 w-4 mr-2" /> Tải vé
                      </Button>
                    </div>
                  )} */}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
}

// Ticket Item Component
function TicketItem({
  ticket,
  onViewDetails,
}: {
  ticket: any;
  onViewDetails: () => void;
}) {
  return (
    <div
      className={cn(
        "bg-white border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition-shadow",
        ticket.status === "expired" && "opacity-75"
      )}
    >
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
          <h4 className="font-medium">Vé tham quan</h4>
          <div className="flex items-center mt-1 md:mt-0">
            {new Date(get(ticket, "invoice_details[0].validDate", "N/A")) >
            new Date() ? (
              <Badge className="bg-blue-500">Chưa tới ngày</Badge>
            ) : get(ticket, "isUsed", "") === "true" ? (
              <Badge className="bg-blue-500">Đã sử dụng</Badge>
            ) : (
              <Badge className="bg-green-500">Quá hạn</Badge>
            )}
            <span className="mx-2 text-gray-300">|</span>
            {get(ticket, "totalPrice", "0") == "0" ? (
              <Badge
                variant="outline"
                className="bg-amber-50 text-amber-800 border-amber-200"
              >
                Đổi điểm (200)
              </Badge>
            ) : (
              <Badge variant="outline">
                Mua vé ({formatCurrency(get(ticket, "totalPrice", 0))})
              </Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              Ngày tham quan:{" "}
              {get(ticket, "invoice_details[0].validDate", "N/A")}
            </span>
          </div>
          <div className="flex items-center">
            <Ticket className="h-4 w-4 mr-1" />
            <span>Số lượng: {ticket.quantity} vé</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>Ngày mua: {get(ticket, "createdAt", "N/A")}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2 self-end md:self-center">
        {ticket.status === "valid" && (
          <>
            <Button variant="outline" size="sm">
              <QrCode className="h-4 w-4 mr-1" /> Mã QR
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" /> Tải vé
            </Button>
          </>
        )}
        <Button size="sm" onClick={onViewDetails}>
          <Eye className="h-4 w-4 mr-1" /> Chi tiết
        </Button>
      </div>
    </div>
  );
}
