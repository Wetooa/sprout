"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { IconInput } from "@/components/icon-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { LockIcon, MailIcon } from "lucide-react";
import Image from "next/image";
import AsideFooter from "../aside-footer";
import SproutHeader from "@/components/sprout-header";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(), // temp need to make adjustments
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  // State variables for loading, error, and success messages
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      Email: values.email,
      Password: values.password,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5105/api/Auth/login",
        payload
      );

      setSuccessMessage(data.Message);

      localStorage.setItem("token", data.Token);
      localStorage.setItem("userID", data.UserId);
      localStorage.setItem("Email", data.Email);
      localStorage.setItem("FirstName", data.FirstName);
      localStorage.setItem("LastName", data.LastName);

      router.push("/map");
    } catch (error: any) {
      if (error.response) {
        console.log(error.response);
        setErrorMessage(error.response?.data?.message);
      } else {
        setErrorMessage("An error occurred during login.");
      }
    } finally {
      setIsLoading(false); // Hide loading state when done
    }
  }

  return (
    <div className="w-full h-full flex gap-10 bg-[url('/bg/sign-in.png')] bg-cover bg-no-repeat p-4 items-center justify-center">
      <section className="w-[848px] h-[934px] flex items-center justify-center border-4 border-white rounded-xl p-[5%]">
        <div className="w-[520px] my-auto bg-white p-12 rounded-xl bg-white/80 backdrop-blur max-w-4xl flex flex-col space-y-4">
          <h2 className="font-bold text-center text-3xl">Sign in to Sprout</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IconInput
                        icon={<MailIcon />}
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IconInput
                        icon={<LockIcon />}
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="" variant={"link"}>
                Forgot password?
              </Button>

              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Sign in"}
              </Button>
            </form>
          </Form>

          {/* Display error or success message */}
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          {successMessage && (
            <div className="text-green-500">{successMessage}</div>
          )}

          <div className="flex items-center gap-2 text-gray-600">
            <hr className="flex-1" />
            <p>or sign in using</p>
            <hr className="flex-1" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button className="flex-1" variant="secondary">
              <Image
                src={"/icons/microsoft-icon.svg"}
                alt="microsoft"
                width={30}
                height={30}
                className="w-7 aspect-square"
              />
              Microsoft
            </Button>
            <Button className="flex-1" variant="secondary">
              <Image
                src={"/icons/google-icon.svg"}
                alt="google"
                width={30}
                height={30}
                className="w-5 aspect-square"
              />
              Google
            </Button>
          </div>
        </div>
      </section>

      <aside className="bg-primary/90 text-secondary backdrop-blur w-[600px] h-[934px] p-10 rounded-xl flex flex-col">
        <SproutHeader />

        <div className="flex-1 flex flex-col justify-center gap-4">
          <h3 className="font-bold text-5xl">
            Enhance Your Agriculture with Innovative Solutions
          </h3>
          <p>
            Don’t have an account yet? Sign up now to access innovative
            solutions that enhance productivity, resilience, and sustainability
            in Philippine agriculture.
          </p>
          <Button
            className="bg-green-500 w-fit font-bold text-2xl p-8 rounded-xl"
            onClick={() => router.push("register")}
          >
            Sign Up
          </Button>
        </div>

        <AsideFooter />
      </aside>
    </div>
  );
}

export default Login;
