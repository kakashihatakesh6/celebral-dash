import { username } from "@/app/utils/global";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user_name, password } = await request.json();

    const headers = new Headers();
    headers.set("Authorization", "Basic " + btoa(username));
    headers.set("Content-Type", "application/json");

    const response = await fetch(`${process.env.FASTAPI_URL}/api/v1/login/`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        username: user_name,
        password,
        email: "test@gmail.com",
        phone_number: 6268885174,
        input_code: "1234",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const data = await response.json();

    if (!data || typeof data !== "object") {
      throw new Error("Invalid data received from API");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
