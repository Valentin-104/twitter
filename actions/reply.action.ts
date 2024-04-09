'use server';

import db from '@/lib/db';
import { currentUser } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

export async function replyToPost(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const image = formData.get('fileUrl') as string;
  let text = formData.get('text') as string;
  text = text.trim();

  if (!text && !image)
    return {
      message: "There's nothing to reply 😢",
    };

  const user = await currentUser();
  const id = user?.id;
  const postId = formData.get('postId') as string;

  try {
    await db.reply.create({
      data: {
        text,
        image,
        author: {
          connect: {
            id,
          },
        },
        post: {
          connect: {
            id: postId,
          },
        },
      },
    });

    revalidatePath('/post');
    revalidatePath('/home');

    return {
      message: '',
    };
  } catch (error: any) {
    return {
      message: 'Failed to reply 😢',
    };
  }
}

export async function readReplies(postId: string) {
  try {
    const replies = await db.reply.findMany({
      where: {
        postId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return replies;
  } catch (error: any) {
    throw new Error(error);
  }
}
