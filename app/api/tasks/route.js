import { connectToMongo } from "@/lib/connect";
import Task from "@/models/Task";
import TimeLog from "@/models/Time-Log";
import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";

async function getTasks(req) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 });

    // Get time logs for each task
    const tasksWithTimeLogs = await Promise.all(
      tasks.map(async (task) => {
        const timeLogs = await TimeLog.find({ taskId: task._id, userId });
        return {
          ...task.toObject(),
          id: task._id.toString(),
          timeLogs: timeLogs.map((log) => ({
            ...log.toObject(),
            id: log._id.toString(),
          })),
        };
      })
    );

    return NextResponse.json({ tasks: tasksWithTimeLogs });
  } catch (error) {
    console.error("Get tasks error:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

async function createTask(req) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const { title, description, status = "PENDING" } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const task = await Task.create({
      title,
      description: description || "",
      status,
      userId,
    });

    console.log(`Task created: ${task.title} for user ${userId}`);

    return NextResponse.json(
      {
        task: {
          ...task.toObject(),
          id: task._id.toString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create task error:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}

export const GET = withAuth(getTasks);
export const POST = withAuth(createTask);
