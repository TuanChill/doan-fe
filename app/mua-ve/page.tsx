"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Ticket, UserRound, CreditCard } from "lucide-react";
import AnimatedSection from "@/components/ui/animated-section";
import StepIndicator from "@/components/ticket/step-indicator";
import StepConnector from "@/components/ticket/step-connector";
import TicketSelection from "@/components/ticket/ticket-selection";
import PersonalInformation from "@/components/ticket/personal-information";
import PaymentMethod from "@/components/ticket/payment-method";
import PaymentConfirmation from "@/components/ticket/payment-confirmation";
import { ticketTypes } from "@/lib/ticket-data";
import { formSchema, TicketFormValues } from "@/components/validation/ticket";
import { useUserStore } from "@/stores/user-store";
export default function TicketPurchasePage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const { user } = useUserStore();

  // Initialize form
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      adultTickets: 1,
      childTickets: 0,
      seniorTickets: 0,
      groupTickets: 0,
      paymentMethod: "card",
      agree: false,
    },
  });

  const watchAdultTickets = form.watch("adultTickets");
  const watchChildTickets = form.watch("childTickets");
  const watchSeniorTickets = form.watch("seniorTickets");
  const watchGroupTickets = form.watch("groupTickets");
  const watchPaymentMethod = form.watch("paymentMethod");
  const watchVisitDate = form.watch("visitDate");

  // Calculate total tickets and price
  const totalTickets =
    Number(watchAdultTickets || 0) +
    Number(watchChildTickets || 0) +
    Number(watchGroupTickets || 0);

  const totalPrice =
    Number(watchAdultTickets || 0) * ticketTypes[0].price +
    Number(watchChildTickets || 0) * ticketTypes[1].price +
    Number(watchGroupTickets || 0) * ticketTypes[2].price;

  // Form submission handler
  const onSubmit = async (data: TicketFormValues) => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    setIsLoading(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate a random order number
    const randomOrderNumber = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setOrderNumber(randomOrderNumber);

    setIsLoading(false);
    setIsPaymentComplete(true);
  };

  // Next step handler
  const handleNextStep = () => {
    if (step === 1) {
      // Check if at least one ticket is selected
      if (totalTickets === 0) {
        form.setError("adultTickets", {
          type: "manual",
          message: "Vui lòng chọn ít nhất một vé",
        });
        return;
      }

      // Check if visit date is selected
      if (!watchVisitDate) {
        form.setError("visitDate", {
          type: "manual",
          message: "Vui lòng chọn ngày tham quan",
        });
        return;
      }
    }

    // Validate form fields for current step
    if (step === 2) {
      const { fullName, email, phoneNumber } = form.getValues();
      if (!fullName || !email || !phoneNumber) {
        form.trigger(["fullName", "email", "phoneNumber"]);
        return;
      }
    }

    setStep((prev) => prev + 1);
  };

  // Previous step handler
  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] bg-gradient-to-r from-stone-900 to-stone-800 flex items-center">
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
                Mua Vé Tham Quan
              </h1>
            </AnimatedSection>
            <AnimatedSection animation="fadeUp" delay={0.5}>
              <p className="text-xl mb-4">
                Đặt vé trực tuyến và thanh toán an toàn, tiện lợi
              </p>
              <div className="h-1 w-20 bg-red-700 mb-6"></div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Step Progress Indicator */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between">
              <StepIndicator
                step={1}
                currentStep={step}
                label="Chọn vé"
                icon={<Ticket className="h-5 w-5" />}
              />
              <StepConnector active={step >= 2} />
              <StepIndicator
                step={2}
                currentStep={step}
                label="Thông tin cá nhân"
                icon={<UserRound className="h-5 w-5" />}
              />
              <StepConnector active={step >= 3} />
              <StepIndicator
                step={3}
                currentStep={step}
                label="Thanh toán"
                icon={<CreditCard className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {isPaymentComplete ? (
              <PaymentConfirmation
                orderNumber={orderNumber}
                visitDate={watchVisitDate}
                totalTickets={totalTickets}
                totalPrice={totalPrice}
                adultsCount={watchAdultTickets}
                childrenCount={watchChildTickets}
                seniorsCount={watchSeniorTickets}
                groupsCount={watchGroupTickets}
              />
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  {/* Step 1: Select Tickets */}
                  {step === 1 && (
                    <TicketSelection
                      form={form}
                      handleNextStep={handleNextStep}
                      totalTickets={totalTickets}
                      totalPrice={totalPrice}
                    />
                  )}

                  {/* Step 2: Personal Information */}
                  {step === 2 && (
                    <PersonalInformation
                      form={form}
                      handleNextStep={handleNextStep}
                      handlePrevStep={handlePrevStep}
                      watchVisitDate={watchVisitDate}
                      totalTickets={totalTickets}
                      totalPrice={totalPrice}
                      watchAdultTickets={watchAdultTickets}
                      watchChildTickets={watchChildTickets}
                      watchSeniorTickets={watchSeniorTickets}
                      watchGroupTickets={watchGroupTickets}
                    />
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                    <PaymentMethod
                      form={form}
                      handlePrevStep={handlePrevStep}
                      isLoading={isLoading}
                      watchPaymentMethod={watchPaymentMethod}
                      watchVisitDate={watchVisitDate}
                      totalTickets={totalTickets}
                      totalPrice={totalPrice}
                      watchAdultTickets={watchAdultTickets}
                      watchChildTickets={watchChildTickets}
                      watchSeniorTickets={watchSeniorTickets}
                      watchGroupTickets={watchGroupTickets}
                    />
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
