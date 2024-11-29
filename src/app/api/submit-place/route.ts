import { neon } from '@neondatabase/serverless';

export async function POST(req) {
  const {
    userInstagram,
    parkName,
    city,
    parkDescription,
    safety
  } = await req.json();  // Retrieve the request body


  const sql = neon(`${process.env.DATABASE_URL}`);  // Connect to the database

  try {
    await sql`
      INSERT INTO places_to_read (user_instagram, park_name, city, park_description, safety)
      VALUES (${userInstagram}, ${parkName}, ${city}, ${parkDescription}, ${safety})
    `;
    return new Response(JSON.stringify({ message: "Place submitted successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error submitting place:", error);
    return new Response(JSON.stringify({ message: "Error submitting place" }), { status: 500 });
  }
}