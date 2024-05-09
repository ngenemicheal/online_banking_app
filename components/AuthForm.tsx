"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp, signIn, getLoggedInUser } from "@/lib/actions/user.actions";

const formSchema = (type: string) => z.object({
    firstname: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastname: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),

    email: z.string().email(),
    password: z.string().min(8),
});

export default function AuthForm({ type }: { type: string }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Define your ProfileForm outside of AuthForm
  function ProfileForm() {
    const formSchemaWithType = formSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchemaWithType>>({
      resolver: zodResolver(formSchemaWithType),
      defaultValues: {
        firstname: type === "sign-in" ? "" : "",
        lastname: type === "sign-in" ? "" : "",
        address: type === "sign-in" ? "" : "",
        city: type === "sign-in" ? "" : "",
        state: type === "sign-in" ? "" : "",
        postalCode: type === "sign-in" ? "" : "",
        dateOfBirth: type === "sign-in" ? "" : "",
        ssn: type === "sign-in" ? "" : "",
        email: "",
        password: "",
        },
    });

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchemaWithType>) => {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      setIsLoading(true);
      try {
        if (type === 'sign-up') {
            const userData = {
                firstName: values.firstname,
                lastName: values.lastname,
                address1: values.address,
                city: values.city,
                state: values.state,
                postalCode: values.postalCode,
                dateOfBirth: values.dateOfBirth,
                ssn: values.ssn,
                email: values.email,
                password: values.password,
            }

            const newUser = await signUp(userData);

            setUser(newUser);
        }
        if (type === 'sign-in') {
            const response = await signIn({
                email: values.email,
                password: values.password,
            });

            if(response) router.push('/');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {
                        type === 'sign-up' && (
                            <>
                                <div className="flex gap-4">
                                    <CustomFormField control={form.control} name="firstname" id='fname1' />
                                    <CustomFormField control={form.control} name="lastname" id='lname1' />
                                </div>
                                <CustomFormField control={form.control} name="address" id='address1' />
                                <CustomFormField control={form.control} name="city" id='city1' />
                                <div className="flex gap-4">
                                    <CustomFormField control={form.control} name="state" id='st1' />
                                    <CustomFormField control={form.control} name="postalCode" id='pc1' />
                                </div>
                                <div className="flex gap-4">
                                    <CustomFormField control={form.control} name="dateOfBirth" id='dob1' />
                                    <CustomFormField control={form.control} name="ssn" id='ssn1' />
                                </div>
                                
                            </>
                        )
                    }
                    <CustomFormField control={form.control} name="email" id='email1' />
                    <CustomFormField control={form.control} name="password" id='password1' />
                    <div className="flex flex-col gap-4">
                        <Button className="form-btn" type="submit" disabled={isLoading}>
                            {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" />&nbsp;<p className="animate-pulse">Loading</p>
                            </>
                            ) : type === "sign-in" ? (
                            "Sign In"
                            ) : (
                            "Sign Up"
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
            <footer className="flex justify-center gap-1">
                <p className="text-14 font-normal text-gray-600">
                    {type === 'sign-in'
                        ? "Don't have an account?"
                        : 'Already have an account?'
                    }
                </p>
                <Link className="form-link" href={type === 'sign-in' ? '/sign-up' : '/sign-in'}>
                    {
                        type === 'sign-in'
                        ? 'Sign Up'
                        : 'Sign In'
                    }
                </Link>
                
            </footer>
        </>
    );
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className="cursor-pointer flex items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="bankLogo" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            TechieBank
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your credentials"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Plaid */}</div>
      ) : (
        <ProfileForm /> // Render ProfileForm component
      )}
    </section>
  );
}
