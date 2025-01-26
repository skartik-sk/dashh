
import { v4 as uuidv4 } from 'uuid'; // For generating random IDs

export async function GET(request: Request) {
    const url = new URL(request.url); // Replace with your fixed ID
  const redirectUrl = `${url.href}/${23}`;
  return Response.redirect(redirectUrl, 302);
}

export async function POST(request: Request) {
  const randomId = uuidv4(); // Generate a random ID
  const url = new URL(request.url);
  const amount = url.searchParams.get('amount') || '0.2';
  const redirectUrl = `/api/donate/${randomId}?amount=${amount}`;

  return Response.redirect(redirectUrl, 302);
}

export const OPTIONS = GET;