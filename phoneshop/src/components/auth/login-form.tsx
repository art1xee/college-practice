"use client"

import * as z from "zod";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { CardWrapper } from "./card-wrapper"
import { LoginSchema } from "../../../schemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "../../../actions/login";
import Link from "next/link";
import { useSearchParams } from "next/navigation";


export const LoginForm = () => {
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
     ? "Email already in use with different provider"
     :"";
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        
        startTransition(() => {
        login(values)
         .then((data) => {
           setError(data?.error);
           setSuccess(data?.success);
         })
     });
    };

    return (
        <CardWrapper 
        headerLabel="З поверненням!"
        backButtonLabel="Не маєте акаунта?"
        backButtonHref="/register"
        showSocial
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"    
                >
                     <div className="space-y-4">
                        <FormField 
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Електронна адреса
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="john.doe@example.com"
                                    type="email"
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
                                <FormLabel>
                                    Пароль
                                </FormLabel>
                                <FormControl>
                                    <Input 
                                    {...field}
                                    disabled={isPending}
                                    placeholder="******"
                                    type="password"
                                    />
                                </FormControl>
                                <Button variant="link" size="sm" asChild className="px-0 font-normal text-black">
                                    <Link href="/reset">
                                        Забули пароль?
                                    </Link>
                                </Button>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div> 
                    <FormError message={error || urlError}/>
                    <FormSuccess message={success}/>
                    <Button
                    disabled={isPending}
                    type="submit"
                    className="w-full"
                    variant="default"
                    >
                        Логін
                    </Button>  
                </form>
            </Form>
        </CardWrapper>
    );
};