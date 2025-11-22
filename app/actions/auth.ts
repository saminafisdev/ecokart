"use server"

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Role } from "../generated/prisma/enums";

export async function signUpAction(formData: FormData) {
    await auth.api.signUpEmail({
        body: {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: (formData.get("role") as string) || Role.CUSTOMER,
        }
    });

    redirect("/")
}

export async function loginAction(formData: FormData) {
    await auth.api.signInEmail({
        body: {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        }
    });

    redirect("/")
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers()
    })
    redirect("/");
}