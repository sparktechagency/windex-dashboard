"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import FormWrapper from "@/components/Form/FormWrapper";
import UOtpInput from "@/components/Form/UOtpInput";
import {
  useResendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/api/authApi";
import { ErrorModal, SuccessModal } from "@/utils/modalHook";
import { Button } from "antd";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomFormError from "@/components/CustomFormError/CustomFormError";
import { z } from "zod";

const otpValidationSchema = z.object({
  otp: z.string().min(6, "Invalid OTP").max(6, "Invalid OTP"),
});

export default function VerifyOtpForm() {
  const [formError, setFormError] = useState(null);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [timer, setTimer] = useState(180); // Timer in seconds
  const router = useRouter();

  const [verifyOtp, { isLoading: isVerifyOtpLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResendOtpLoading }] = useResendOtpMutation();

  // Handle Resend OTP functionality
  const handleResendOtp = async () => {
    try {
      const token = Cookies.get("forgotPassToken");
      if (!token) {
        throw new Error("No token found for OTP resend");
      }
      const { email } = jwtDecode(token);
      const res = await resendOtp({ email }).unwrap();

      if (res?.success) {
        SuccessModal("OTP re-sent successfully", "Check your email for the new OTP");
        Cookies.set("forgotPassToken", res?.data?.token, {
          expires: 1 / 24, // 1 hour
          secure: true,
          sameSite: "Strict",
        });

        // Disable resend button and start timer
        setIsResendDisabled(true);
        setTimer(180);

        const countdownInterval = setInterval(() => {
          setTimer((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              setIsResendDisabled(false);
            }
            return prev - 1;
          });
        }, 1000);
      }
    } catch (error) {
      ErrorModal(error?.data?.message || error?.message || "Failed to resend OTP");
    }
  };

  // Format timer to MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle OTP verification
  const handleVerifyOtp = async (data) => {
    try {
      const token = Cookies.get("forgotPassToken");
      if (!token) {
        throw new Error("No token found for OTP verification");
      }

      const res = await verifyOtp({ otp: data.otp, token }).unwrap();

      if (res?.success) {
        SuccessModal("OTP Verification Successful", "You can now set a new password");

        // Remove forgotPassToken and set new token
        Cookies.remove("forgotPassToken");
        Cookies.set("changePassToken", res?.data?.token, {
          expires: 7, // 7 days, adjust as needed
          secure: true,
          sameSite: "Strict",
        });

        // Redirect to set-new-password
        router.push("/set-new-password");
      }
    } catch (error) {
      setFormError(error?.data?.message || "Failed to verify OTP");
    }
  };

  return (
    <div className="px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Verify OTP</h4>
        <p className="text-dark-gray">
          Enter the OTP that we&apos;ve sent to your email
        </p>
      </section>

      <FormWrapper
        onSubmit={handleVerifyOtp}
        resolver={zodResolver(otpValidationSchema)}
      >
        <UOtpInput name="otp" />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full"
          loading={isVerifyOtpLoading}
        >
          Submit
        </Button>

        <p className="mx-auto mt-2 w-max font-medium text-[#8a8888]">
          Didn&apos;t get the code?{" "}
          <Button
            htmlType="button"
            type="link"
            className="text-primary-blue px-0"
            onClick={handleResendOtp}
            disabled={isResendDisabled || isResendOtpLoading}
          >
            {isResendDisabled ? `Resend in ${formatTime(timer)}` : "Resend"}
          </Button>
        </p>

        {formError && <CustomFormError formError={formError} />}
      </FormWrapper>
    </div>
  );
}