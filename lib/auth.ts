import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import prisma from '@/lib/prisma'
import { nextCookies } from 'better-auth/next-js'
import { Role } from '@/app/generated/prisma/enums'

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: 'postgresql',
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [
        nextCookies()
    ],
    user: {
        additionalFields: {
            role: {
                type: 'string',
                values: ['ADMIN', 'VENDOR', 'CUSTOMER'] as const,
                input: true,
                required: false,
                default: Role.CUSTOMER
            }
        }
    }
})

export type Session = typeof auth.$Infer.Session
export type User = typeof auth.$Infer.Session.user;
