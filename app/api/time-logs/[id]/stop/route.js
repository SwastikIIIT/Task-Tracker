import { connectToMongo } from "@/lib/connect";
import TimeLog from "@/models/Time-Log";
import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";

async function stopTimeLog(req, { params }) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const logId = params.id;

    const timeLog = await TimeLog.findOne({ _id: logId, userId });

    if (!timeLog) {
      return NextResponse.json(
        { error: "Time log not found" },
        { status: 404 }
      );
    }

    const endTime = new Date();
    const duration = Math.floor(
      (endTime.getTime() - timeLog.startTime.getTime()) / 1000
    );

    const updatedLog = await TimeLog.findByIdAndUpdate(
      logId,
      { endTime, duration },
      { new: true }
    );

    console.log(`Time tracking stopped for log: ${logId}`);

    return NextResponse.json({
      timeLog: {
        ...updatedLog.toObject(),
        id: updatedLog._id.toString(),
      },
    });
  } catch (error) {
    console.error("Stop time log error:", error);
    return NextResponse.json(
      { error: "Failed to stop time tracking" },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(stopTimeLog);
