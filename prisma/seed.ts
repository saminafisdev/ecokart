import { PrismaClient, Prisma, Role } from "../app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg'
import 'dotenv/config'

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const prisma = new PrismaClient({
    adapter,
});

console.log(process.env.DATABASE_URL)

export async function main() {
    console.log("Seeding database...");

    // USERS
    const admin = await prisma.user.create({
        data: {
            id: crypto.randomUUID(),
            name: "Admin User",
            email: "admin@example.com",
            role: Role.ADMIN,
        },
    });

    const vendor = await prisma.user.create({
        data: {
            id: crypto.randomUUID(),
            name: "Vendor User",
            email: "vendor@example.com",
            role: Role.VENDOR,
        },
    });

    const customer = await prisma.user.create({
        data: {
            id: crypto.randomUUID(),
            name: "Customer User",
            email: "customer@example.com",
            role: Role.CUSTOMER,
        },
    });

    // STORE
    const store = await prisma.store.create({
        data: {
            name: "Tech Haven",
            slug: "tech-haven",
            description: "Your trusted electronics store.",
            vendorId: vendor.id,
        },
    });

    // MAIN CATEGORIES
    const electronics = await prisma.category.create({
        data: {
            name: "Electronics",
            slug: "electronics",
        },
    });

    const fashion = await prisma.category.create({
        data: {
            name: "Fashion",
            slug: "fashion",
        },
    });

    const books = await prisma.category.create({
        data: {
            name: "Books",
            slug: "books",
        },
    });

    // SUBCATEGORIES
    const smartphones = await prisma.category.create({
        data: {
            name: "Smartphones",
            slug: "smartphones",
            parentCategoryId: electronics.id,
        },
    });

    const laptops = await prisma.category.create({
        data: {
            name: "Laptops",
            slug: "laptops",
            parentCategoryId: electronics.id,
        },
    });

    const mensClothing = await prisma.category.create({
        data: {
            name: "Men's Clothing",
            slug: "mens-clothing",
            parentCategoryId: fashion.id,
        },
    });

    const fictionBooks = await prisma.category.create({
        data: {
            name: "Fiction",
            slug: "fiction",
            parentCategoryId: books.id,
        },
    });

    // PRODUCTS
    const product1 = await prisma.product.create({
        data: {
            name: "Gaming Laptop",
            slug: "gaming-laptop",
            price: "1299.99",
            stock: 20,
            description: "High performance gaming laptop.",
            imageUrl: ["https://placehold.co/600x400"],
            storeId: store.id,
            categoryId: laptops.id,
        },
    });

    const product2 = await prisma.product.create({
        data: {
            name: "Smartphone Elite",
            slug: "smartphone-elite",
            price: "899.99",
            stock: 40,
            description: "Flagship smartphone with premium features.",
            imageUrl: ["https://placehold.co/600x400"],
            storeId: store.id,
            categoryId: smartphones.id,
        },
    });

    console.log({
        admin,
        vendor,
        customer,
        store,
        mainCategories: { electronics, fashion, books },
        subCategories: { smartphones, laptops, mensClothing, fictionBooks },
        products: { product1, product2 },
    });
}

main()
