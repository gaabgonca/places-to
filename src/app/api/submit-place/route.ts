import { sql } from "@vercel/postgres";

export async function POST(req) {
  const {
    userTwitter,
    suggestedBook,
    parkName,
    city,
    parkDescription,
    safety
  } = await req.json();  // Retrieve the request body

  try {
    await sql`
      INSERT INTO places_to_read (user_twitter, suggested_book, park_name, city, park_description, safety)
      VALUES (${userTwitter}, ${suggestedBook}, ${parkName}, ${city}, ${parkDescription}, ${safety})
    `;
    return new Response(JSON.stringify({ message: "Place submitted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error submitting place:", error);
    return new Response(JSON.stringify({ message: "Error submitting place" }), { status: 500 });
  }
}

export const allowedMethods = ['POST']; // Optional: Specify allowed methods if needed.