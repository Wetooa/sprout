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
import SproutHeader from "@/components/sprout-header";
import AsideFooter from "../aside-footer";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";

const formSchema = z
  .object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter(); // For navigating to login page

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const payload = {
      FirstName: values.firstname,
      LastName: values.lastname,
      Email: values.email,
      Password: values.password,
    };

    try {
      const { data } = await axios.post(
        "http://localhost:5105/api/Auth/register",
        payload
      );
      setSuccessMessage(data.Message);
      setIsModalOpen(true); // Show the modal after success
    } catch (error: any) {
      setErrorMessage(
        error.response?.data || "An error occurred during registration."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-full flex gap-10 bg-[url('/bg/sign-up.png')] bg-cover bg-no-repeat items-center justify-center">
      <aside className="bg-primary/90 text-secondary backdrop-blur w-[600px] h-[934px] p-10 rounded-xl flex flex-col">
        <SproutHeader />
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h3 className="font-bold text-5xl">
            Join Sprout and Transform Your Agricultural Experience
          </h3>
          <p>
            Already have an account? Sign in now to continue accessing the tools
            and insights that drive productivity and sustainability in
            Philippine agriculture.
          </p>
          <Button
            className="bg-green-500 w-fit font-bold text-2xl p-8 rounded-xl"
            onClick={() => router.push("login")}
          >
            Sign In
          </Button>
        </div>

        <AsideFooter />
      </aside>

      <section className="w-[848px] h-[934px] flex items-center justify-center border-4 border-white rounded-xl p-[5%]">
        <div className="w-[520px] my-auto bg-white p-10 rounded-xl bg-white/80 backdrop-blur flex flex-col space-y-4">
          <h2 className="font-bold text-center text-3xl">Sign in to Sprout</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="flex justify-between w-full gap-4">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <IconInput
                          icon={<MailIcon />}
                          placeholder="First Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <IconInput
                          icon={<MailIcon />}
                          placeholder="Last Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IconInput
                        icon={<LockIcon />}
                        type="password"
                        placeholder="Confirm Password"
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

              <Button className="w-full" type="submit">
                Sign Up
              </Button>
            </form>
          </Form>

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
                alt="microsoft"
                width={30}
                height={30}
                className="w-5 aspect-square"
              />
              Google
            </Button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[442px] h-[267px] bg-white p-8 rounded-xl flex flex-col justify-between">
            <div className="flex flex-col items-center justify-center flex-grow space-y-4">
              <h1 className="font-bold text-2xl">{successMessage}</h1>
              <span className="text-sm text-center">
                Your account has been created! You can now go to the login page
                and input your credentials.
              </span>
            </div>
            <Button
              className="w-full mt-4"
              onClick={() => router.push("login")}
            >
              Go to Login
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
