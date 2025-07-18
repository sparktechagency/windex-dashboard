"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPassSchema } from "@/schema/authSchema";
import FormWrapper from "@/components/Form/FormWrapper";
import UInput from "@/components/Form/UInput";
import { Button } from "antd";
import { useForgotPasswordMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SuccessModal } from "@/utils/modalHook";
import CustomFormError from "@/components/CustomFormError/CustomFormError";
import Cookies from "js-cookie";

export default function ForgotPassForm() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [formError, setFormError] = useState(null);
  const router = useRouter();

  const handleForgotPassword = async (data) => {
    try {
      const res = await forgotPassword({ email: data.email }).unwrap();

      if (res?.success) {
        SuccessModal(
          "OTP sent to email",
          "Please check your email for OTP verification",
        );

        // Store token in cookie
        Cookies.set("forgotPassToken", res.data.token, {
          expires: 1 / 24, // Expires in 1 hour
          secure: true, // Use secure cookies in production
          sameSite: "Strict",
        });

        // Redirect to OTP verification page
        router.push("/otp-verification");
      }
    } catch (error) {
      setFormError(error?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <div className="w-full px-6 py-8">
      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold">Forgot Password</h4>
        <p className="text-dark-gray">
          Enter your email and we&apos;ll send you an OTP for verification
        </p>
      </section>

      <FormWrapper
        defaultValues={{ email: "junayednoman05@gmail.com" }}
        onSubmit={handleForgotPassword}
        resolver={zodResolver(forgotPassSchema)}
      >
        <UInput
          type="email"
          name="email"
          label="Email"
          placeholder="Enter your email"
          size="large"
          className="!h-10"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="!h-10 w-full !font-medium"
          loading={isLoading}
        >
          Submit
        </Button>

        {formError && <CustomFormError formError={formError} />}
      </FormWrapper>
    </div>
  );
}
