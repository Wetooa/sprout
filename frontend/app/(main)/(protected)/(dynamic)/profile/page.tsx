"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  aboutMe: z.string().optional(),
});

function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    aboutMe: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: user,
  });

  useEffect(() => {
    const firstName = localStorage.getItem("FirstName") || "";
    const lastName = localStorage.getItem("LastName") || "";
    const email = localStorage.getItem("Email") || "";
    const aboutMe = localStorage.getItem("AboutMe") || "Passionate about leveraging modern technology to enhance agricultural productivity and sustainability.";

    setUser({ firstName, lastName, email, aboutMe });
    form.reset({ firstName, lastName, email, aboutMe }); // Set form defaults
  }, [form]);

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      const payload = {
        UserId: localStorage.getItem("userID"),
        FirstName: values.firstName,
        LastName: values.lastName,
        Email: values.email,
        AboutMe: values.aboutMe || "", // Ensure `aboutMe` is always a string
      };
  
      const response = await axios.post(
        "http://localhost:5105/api/User/update",
        payload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Update localStorage and UI state
      localStorage.setItem("FirstName", values.firstName);
      localStorage.setItem("LastName", values.lastName);
      localStorage.setItem("Email", values.email);
      localStorage.setItem("AboutMe", values.aboutMe || ""); // Ensure empty string if undefined
  
      setUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        aboutMe: values.aboutMe || "", // Ensure empty string if undefined
      });
      setSuccessMessage("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (error: any) {
      console.error("API Error:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.message || "An error occurred while updating."
      );
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="bg-[url('/bg/main.svg')] bg-cover bg-no-repeat overflow-y-scroll w-full h-full p-16 flex flex-col justify-center">
      <div className="flex flex-col gap-6 max-w-4xl">
        {/* Profile Header */}
        <div className="flex items-center gap-6">
          <Image
            src={"/members/simon.jpg"}
            alt="Profile Picture"
            width={120}
            height={120}
            className="rounded-full border-2 border-primary"
          />
          <div>
            <h1 className="text-4xl font-bold text-primary">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-lg text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="flex flex-col gap-4 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary">About Me</h2>
          <p className="text-lg">{user.aboutMe}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="p-4 rounded-lg" onClick={handleEditProfile}>
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label>First Name</label>
                <input
                  {...form.register("firstName")}
                  className="w-full border rounded p-2"
                />
                {form.formState.errors.firstName && (
                  <p className="text-red-500">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label>Last Name</label>
                <input
                  {...form.register("lastName")}
                  className="w-full border rounded p-2"
                />
                {form.formState.errors.lastName && (
                  <p className="text-red-500">
                    {form.formState.errors.lastName.message}
                  </p>
                )}
              </div>
              <div>
                <label>Email</label>
                <input
                  {...form.register("email")}
                  className="w-full border rounded p-2"
                />
                {form.formState.errors.email && (
                  <p className="text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label>About Me</label>
                <textarea
                  {...form.register("aboutMe")}
                  className="w-full border rounded p-2 h-24"
                />
                {form.formState.errors.aboutMe && (
                  <p className="text-red-500">
                    {form.formState.errors.aboutMe.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update"}
                </Button>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
              </div>
            </form>
            {successMessage && (
              <p className="text-green-500 mt-4">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
