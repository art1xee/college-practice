"use client";

import { logout } from "../../../../../actions/logout";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SettingsSchema } from "../../../../../schemas";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "../../../../../actions/settings";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "../../../../../hooks/use-current-user";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";

const ProfileEditPage = () => {
    const user = useCurrentUser(); 

    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
        startTransition(() => {
            settings(values)
             .then((data) => {
                if (data && "error" in data) {
                    setError(data.error);
                }
                
                if (data && "success" in data) {
                    update()
                    setSuccess(data.success);
                }
             })
             .catch(() => setError("Something went wrong!"))
        });
    }
    const handleLogout = async () => {
        await logout();  // Вызов функции logout
    };

    return (
        <Card className="w-[600px]">
            <CardHeader> 
                <p className="text-2xl font-semibold text-center">
                    Settings
                </p>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form 
                    className="space-y-6" 
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <div className="space-y-4">
                         <FormField
                         control = {form.control}
                         name = "name"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Name</FormLabel>
                                 <FormControl>
                                     <Input
                                       {...field}
                                       placeholder="Ryan Gosling"
                                       disabled={isPending}
                                     />
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                            )} 
                         />
                         {user?.isOAuth === false && (
                        <>
                         <FormField
                         control = {form.control}
                         name = "email"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Email</FormLabel>
                                 <FormControl>
                                     <Input
                                       {...field}
                                       placeholder="RyanGosling@gmail.com"
                                       type="email"
                                       disabled={isPending}
                                     />
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                            )} 
                         />
                          <FormField
                         control = {form.control}
                         name = "password"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Password</FormLabel>
                                 <FormControl>
                                     <Input
                                       {...field}
                                       placeholder="******"
                                       type="password"
                                       disabled={isPending}
                                     />
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                            )} 
                         />
                         <FormField
                         control = {form.control}
                         name = "newPassword"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel>New Password</FormLabel>
                                 <FormControl>
                                     <Input
                                       {...field}
                                       placeholder="******"
                                       type="password"
                                       disabled={isPending}
                                     />
                                 </FormControl>
                                 <FormMessage />
                             </FormItem>
                            )} 
                         />
                        </>
                        )}
                         <FormField
                         control = {form.control}
                         name = "role"
                         render={({ field }) => (
                             <FormItem>
                                 <FormLabel>Role</FormLabel>
                                 <Select
                                   disabled={isPending}
                                   onValueChange={field.onChange}
                                   defaultValue={field.value}
                                 >   
                                  <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role"/>
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value={UserRole.ADMIN}> 
                                        Admin
                                    </SelectItem>
                                    <SelectItem value={UserRole.USER}> 
                                        User
                                    </SelectItem>
                                  </SelectContent>
                                 </Select>
                                 <FormMessage />
                             </FormItem>
                            )} 
                         />
                        </div>
                        <FormError message={error} />
                        <FormSuccess message={success} />
                        <Button 
                            disabled = {isPending}
                            type="submit"
                        >
                            Save
                        </Button>
                    </form>
                </Form>
                {/* Кнопка выхода */}
                <div className="mt-4">
                    <Button onClick={handleLogout} variant="destructive" className="w-full">
                        Logout
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
        
}

export default ProfileEditPage;