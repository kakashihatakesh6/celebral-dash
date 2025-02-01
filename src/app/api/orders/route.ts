/* eslint-disable @typescript-eslint/no-unused-vars */
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'orders.json')

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data')
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir)
  }
}

export async function GET() {
  try {
    await ensureDataDirectory()
    
    try {
      const fileContent = await fs.readFile(dataFilePath, 'utf-8')
      const orders = JSON.parse(fileContent)
      return NextResponse.json(orders)
    } catch (error) {
      // If file doesn't exist or is empty, return empty array
      return NextResponse.json([])
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
} 