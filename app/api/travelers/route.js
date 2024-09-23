import Travelers from "@/models/Travelers";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
      const travelers = await Travelers.find(); // Fetch all travelers
      return NextResponse.json(travelers); // Return travelers list
    } catch (error) {
      return NextResponse.json({ error: 'Failed to fetch travelers' }, { status: 500 });
    }
}  

export async function POST(request) {
  try {
    const body = await request.json(); // Parse request body

    // Validate required fields
    const { username, email, password } = body;
    if (!username || !email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create a new traveler document
    const newTraveler = new Travelers(body);

    // Try saving the new traveler to the database
    await newTraveler.save();

    // Return the created traveler
    return NextResponse.json(newTraveler, { status: 201 });
  } catch (error) {
    // Log the detailed error message for debugging
    console.error("Error creating traveler:", error.message || error);
    
    // Respond with a detailed error message for debugging
    return NextResponse.json({ error: `Failed to create traveler: ${error.message}` }, { status: 500 });
  }
}
