import mongoose from "mongoose";

const WorkflowSchema = new mongoose.Schema(
    {
        name: { type: String, default: "Untitled Workflow" },
        nodes: { type: Array, required: true },
        edges: { type: Array, required: true },
    },
    { timestamps: true }
);

const Workflow = mongoose.models.Workflow ||
    mongoose.model("Workflow", WorkflowSchema);

export default Workflow;