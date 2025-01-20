import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';
import { LoginSchema } from '../../../../../../../schemas';  
import { getUserByEmail } from '../../../../../../../data/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; 
export const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();

        // Validate input using Zod
        const parsedBody = LoginSchema.safeParse(body);
        if (!parsedBody.success) {
            return NextResponse.json({ error: 'Invalid input fields' }, { status: 400 });
        }

        const { email, password } = parsedBody.data;

        // Fetch user from the database
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        if (!user.emailVerified) {
            return NextResponse.json({ error: 'Email not verified' }, { status: 403 });
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' } 
        );

        return NextResponse.json({ message: 'Login successful', token });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
};
