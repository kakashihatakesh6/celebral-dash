import { NextResponse } from "next/server"

export async function GET() {
  try {
    const headers = new Headers()
    headers.set("Authorization", "Basic " + btoa("trial:assignment123"))
    headers.set("Content-Type", "application/json")

    const response = await fetch("http://3.111.196.92:8020/api/v1/sample_assignment_api_4/", {
      method: "GET",
      headers: headers,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const data = await response.json()
    console.log("API Response:", data)

    if (!data || typeof data !== "object") {
      throw new Error("Invalid data received from API")
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 },
    )
  }
}

