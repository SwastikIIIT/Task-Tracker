import { connectToMongo } from "@/lib/connect";
import TimeLog from "@/models/Time-Log";
import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";

async function getTimeLogs(req) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const timeLogs = await TimeLog.find({ userId }).sort({ startTime: -1 });

    const formattedLogs = timeLogs.map((log) => ({
      ...log.toObject(),
      id: log._id.toString(),
    }));

    return NextResponse.json({ timeLogs: formattedLogs });
  } catch (error) {
    console.error("Get time logs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch time logs" },
      { status: 500 }
    );
  }
}

async function createTimeLog(req) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    // Check if there's already an active time log
    const activeLog = await TimeLog.findOne({ userId, endTime: null });
    if (activeLog) {
      return NextResponse.json(
        { error: "Stop current tracking before starting new one" },
        { status: 400 }
      );
    }

    const timeLog = await TimeLog.create({
      taskId,
      userId,
      startTime: new Date(),
    });

    console.log(`Time tracking started for task: ${taskId}`);

    return NextResponse.json(
      {
        timeLog: {
          ...timeLog.toObject(),
          id: timeLog._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create time log error:", error);
    return NextResponse.json(
      { error: "Failed to start time tracking" },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getTimeLogs);
export const POST = withAuth(createTimeLog);
