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
import { MailIcon } from "lucide-react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(), // temp need to make adjsutments
});

function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="w-full h-full flex gap-10 p-10 bg-gray-200">
      <section className="w-full h-full flex items-center justify-center border-2 border-white rounded-lg flex-[3]">
        <div className="m-auto bg-white p-4 rounded-lg backdrop-blur-sm">
          <h2 className="text-3xl">Sign in to Sprout</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <IconInput
                        icon={<MailIcon />}
                        className="border-2 border-green-200"
                        placeholder="Email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>

          <div className="flex items-center gap-2">
            <hr className="flex-1" />
            <p>or sign in using</p>
            <hr className="flex-1" />
          </div>

          <div className="flex items-center justify-center gap-4">
            <Button variant="secondary">Google</Button>
            <Button variant="secondary">Twitter</Button>
          </div>
        </div>
      </section>

      <aside className="bg-green-200 flex-[2]">some side content here</aside>
    </div>
  );
}

export default Login;
