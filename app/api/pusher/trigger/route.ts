import { NextRequest, NextResponse } from "next/server";
import pusher from "@/lib/pusher";

export async function POST(request: NextRequest) {
  try {
    const { message, username, roomId, sentAt } = await request.json();

    // trigger the message on pusher
    await pusher.trigger(`chat-${roomId}`, "new message", {
      username,
      message,
      sentAt,
    });
    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: "error", error });
  }
}
