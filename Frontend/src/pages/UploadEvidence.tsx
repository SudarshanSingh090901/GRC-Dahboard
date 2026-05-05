import { useState } from "react";
import axios from "axios";

type SelectedControl = {
  framework: string;
  controlId: string;
  controlName: string;
};

export default function UploadEvidence() {
  const selectedControl: SelectedControl = JSON.parse(
    localStorage.getItem("selectedControl") || "{}"
  );

  const ownerName = localStorage.getItem("ownerName") || "";

  const [status, setStatus] = useState("Implemented");
  const [remarks, setRemarks] = useState("");
  const [evidenceType, setEvidenceType] = useState("Policy Document");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("framework", selectedControl.framework);
    formData.append("controlId", selectedControl.controlId);
    formData.append("controlName", selectedControl.controlName);
    formData.append("ownerName", ownerName);
    formData.append("status", status);
    formData.append("remarks", remarks);
    formData.append("evidenceType", evidenceType);

    if (file) {
      formData.append("file", file);
    }

    try {
      await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Evidence uploaded successfully.");

      setTimeout(() => {
        window.location.href = "/owner-dashboard";
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage("Failed to upload evidence.");
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-3xl font-bold text-white">Upload Evidence</h1>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-4">
        <p className="text-sm text-slate-400">
          {selectedControl.framework}
        </p>
        <h2 className="mt-1 text-xl font-semibold text-white">
          {selectedControl.controlId} - {selectedControl.controlName}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Status
          </label>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option>Implemented</option>
            <option>Partially Implemented</option>
            <option>Not Implemented</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Evidence Type
          </label>

          <select
            value={evidenceType}
            onChange={(e) => setEvidenceType(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          >
            <option>Policy Document</option>
            <option>SOP</option>
            <option>Screenshot</option>
            <option>Audit Report</option>
            <option>Log File</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Remarks
          </label>

          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
            placeholder="Describe the implementation evidence..."
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Upload File
          </label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white"
          />
        </div>

        {message && (
          <div className="rounded-xl bg-green-500/10 px-4 py-3 text-green-400">
            {message}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Submit Evidence
        </button>
      </form>
    </div>
  );
}