import { connectToMongo } from "@/lib/connect";
import Task from "@/models/Task";
import TimeLog from "@/models/Time-Log";
import { withAuth } from "@/lib/middleware";
import { NextResponse } from "next/server";

async function updateTask(req, { params }) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const { title, description, status } = await req.json();
    const taskId = params.id;

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { title, description, status, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    console.log(`Task updated: ${taskId}`);

    return NextResponse.json({
      task: {
        ...updatedTask.toObject(),
        id: updatedTask._id.toString(),
      },
    });
  } catch (error) {
    console.error("Update task error:", error);
    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

async function deleteTask(req, { params }) {
  try {
    await connectToMongo();

    const userId = req.user.userId;
    const taskId = params.id;

    // Delete task
    const deletedTask = await Task.findOneAndDelete({ _id: taskId, userId });

    if (!deletedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    // Delete associated time logs
    await TimeLog.deleteMany({ taskId, userId });

    console.log(`Task deleted: ${taskId}`);

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}

export const PUT = withAuth(updateTask);
export const DELETE = withAuth(deleteTask);
