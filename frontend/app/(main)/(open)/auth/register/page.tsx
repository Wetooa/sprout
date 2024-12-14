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

const formSchema = z
  .object({
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    password: z.string(),
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await axios.post(
      "http://localhost:5105/api/Auth/register",
      values,
    );
  }

  return (
    <div className="w-full h-full flex gap-10 bg-[url('/bg/sign-up.png')] bg-cover bg-no-repeat">
      <aside className="bg-primary/90 text-secondary backdrop-blur flex-[5] p-10 rounded-2xl flex flex-col">
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
          <Button className="bg-green-500 w-fit font-bold text-2xl p-8 rounded-2xl">
            Sign up
          </Button>
        </div>

        <AsideFooter />
      </aside>

      <section className="w-full h-full flex items-center justify-center border-4 border-white rounded-2xl flex-[6] p-[10%]">
        <div className="w-full my-auto bg-white p-12 rounded-2xl bg-white/80 backdrop-blur flex flex-col space-y-4">
          <h2 className="font-bold text-center text-3xl">Sign in to Sprout</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-full"
            >
              <div className="flex gap-2 w-full">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
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
                    <FormItem>
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
                Sign in
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
    </div>
  );
}

export default Register;
