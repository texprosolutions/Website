import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Upload, Film } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = ["Residential", "Commercial & Loading Docks", "Gates & Access Control", "Storage Facilities", "Metal Buildings & Shops"];

export default function VideoUploadPanel({ onUploaded }) {
  const [form, setForm] = useState({ title: "", location: "", category: "Residential", year: "", description: "", is_featured: false });
  const [file, setFile] = useState(null);
  const [thumb, setThumb] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const onFile = (e) => setFile(e.target.files?.[0] || null);
  const onThumb = (e) => setThumb(e.target.files?.[0] || null);

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({ variant: "destructive", title: "Video required", description: "Select an MP4 clip to publish." });
      return;
    }
    setSubmitting(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      let thumbnail_url = "";
      if (thumb) thumbnail_url = (await base44.integrations.Core.UploadFile({ file: thumb })).file_url;
      await base44.entities.GalleryVideo.create({ ...form, video_url: file_url, thumbnail_url });
      toast({ title: "Video published", description: "Added to the project video showcase." });
      setForm({ title: "", location: "", category: "Residential", year: "", description: "", is_featured: false });
      setFile(null);
      setThumb(null);
      onUploaded?.();
    } catch (err) {
      toast({ variant: "destructive", title: "Upload failed", description: err?.message || "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-background border border-border p-6">
      <h3 className="font-heading font-bold text-lg text-primary">Upload project video</h3>
      <div className="mt-4 grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-accent transition-colors min-h-[140px] flex items-center justify-center">
            <input type="file" accept="video/mp4,video/quicktime,video/webm" onChange={onFile} className="hidden" />
            <div>
              <Film className="w-7 h-7 mx-auto text-muted-foreground" />
              <div className="mt-2 font-mono-tech text-[10px] text-muted-foreground">{file ? file.name : "Click to select an MP4 clip"}</div>
            </div>
          </label>
          <label className="block border-2 border-dashed border-border p-6 text-center cursor-pointer hover:border-accent transition-colors min-h-[100px] flex items-center justify-center">
            <input type="file" accept="image/*" onChange={onThumb} className="hidden" />
            <div>
              <Upload className="w-6 h-6 mx-auto text-muted-foreground" />
              <div className="mt-2 font-mono-tech text-[10px] text-muted-foreground">{thumb ? thumb.name : "Optional poster image"}</div>
            </div>
          </label>
        </div>

        <div className="space-y-4">
          <Field label="Title">
            <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Year">
              <input value={form.year} onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))} placeholder="2025" className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
            </Field>
          </div>
          <Field label="Location">
            <input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="City, TX" className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
          </Field>
          <Field label="Description">
            <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary resize-none" />
          </Field>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 accent-[hsl(var(--accent))] cursor-pointer" />
            <span className="font-mono-tech text-[10px] text-muted-foreground">Feature this video prominently</span>
          </label>
        </div>
      </div>

      <button type="submit" disabled={submitting} className="mt-6 inline-flex items-center gap-2 h-12 px-6 bg-accent text-accent-foreground font-mono-tech text-xs active:animate-latch disabled:opacity-60">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />} Publish video
      </button>
    </form>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-mono-tech text-[10px] text-muted-foreground">{label}</span>
      <div className="border-b-2 border-border focus-within:border-accent transition-colors">{children}</div>
    </label>
  );
}