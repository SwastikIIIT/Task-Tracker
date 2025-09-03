import { connectToMongo } from "@/lib/connect";
import Task from "@/models/Task";
import TimeLog from "@/models/Time-Log";
import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";

async function getDailySummary(req) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get today's time logs
    const todayTimeLogs = await TimeLog.find({
      userId,
      startTime: { $gte: today, $lt: tomorrow },
    });

    // Get tasks worked on today
    const taskIds = [
      ...new Set(todayTimeLogs.map((log) => log.taskId.toString())),
    ];
    const tasksWorkedOn = await Task.find({
      _id: { $in: taskIds },
      userId,
    });

    // Calculate totals
    const totalTimeTracked = todayTimeLogs.reduce(
      (total, log) => total + (log.duration || 0),
      0
    );

    const allUserTasks = await Task.find({ userId });
    const completedTasks = allUserTasks.filter(
      (task) => task.status === "COMPLETED"
    ).length;
    const inProgressTasks = allUserTasks.filter(
      (task) => task.status === "IN_PROGRESS"
    ).length;
    const pendingTasks = allUserTasks.filter(
      (task) => task.status === "PENDING"
    ).length;

    const summary = {
      date: today.toISOString().split("T")[0],
      totalTimeTracked,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      tasksWorkedOn: tasksWorkedOn.map((task) => ({
        ...task.toObject(),
        id: task._id.toString(),
      })),
    };

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Get summary error:", error);
    return NextResponse.json(
      { error: "Failed to fetch summary" },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getDailySummary);
