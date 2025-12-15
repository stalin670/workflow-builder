import mongoose from "mongoose";

const WorkflowSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        name: String,
        nodes: Array,
        edges: Array,
    },
    { timestamps: true }
);

export default mongoose.models.Workflow ||
    mongoose.model("Workflow", WorkflowSchema);
