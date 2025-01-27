"use client";

import React, { useState } from "react";
import NavigationBar from "@/components/frontend/NavigationBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SettingsSchema } from "../../../../../schemas";
import { settings } from "../../../../../actions/settings";
import { logout } from "../../../../../actions/logout";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useCurrentUser } from "../../../../../hooks/use-current-user";

const ProfileEditPage: React.FC = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      role: user?.role || undefined,
    },
  });

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    setIsPending(true);
    try {
      const result = await settings(values);
      if (result && "error" in result) {
        setError(result.error);
      } else if (result && "success" in result) {
        setSuccess(result.success);
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsPending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-blue-100">
      {/* Navigation Bar */}
      <NavigationBar />

      {/* Main Content */}
      <main className="flex-1 bg-blue-200 pt-4">
        <div className="max-w-3xl mx-auto pb-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-20 h-20 bg-orange-500 text-white flex items-center justify-center rounded-full text-2xl font-bold">
              <span>{user?.name?.[0]?.toUpperCase() || "U"}</span>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">Редагування профілю</h2>
              <button className="text-blue-600 text-sm hover:underline">+ додати фото</button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-700 mb-4">ОСНОВНА ІНФОРМАЦІЯ</h3>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ім’я</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ваше ім’я" disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Електронна адреса</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="example@mail.com" disabled={isPending} />
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
                      <FormLabel>Новий пароль</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Введіть новий пароль"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Підтвердіть новий пароль</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Підтвердження паролю"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="py-3 flex justify-end">
                  <Button type="submit" variant="default" className="bg-orange-500 text-white">
                    Зберегти
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Logout Button */}
          <div className="mt-6">
            <Button
              variant="destructive"
              className="bg-red-500 text-white w-full"
              onClick={handleLogout}
              disabled={isPending}
            >
              Вийти
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileEditPage;
