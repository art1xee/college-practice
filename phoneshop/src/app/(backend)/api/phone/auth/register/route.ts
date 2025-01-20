import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { db } from '@/lib/db';
import { RegisterSchema } from '../../../../../../../schemas';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = RegisterSchema.parse(req.body);

    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: { email, password: hashedPassword },
    });

    return res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    return res.status(400).json({ error: error instanceof z.ZodError ? error.errors : 'Invalid request' });
  }
}
