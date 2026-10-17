import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Loader2, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = ["Residential", "Commercial", "Gates", "Storage Facilities", "Metal Buildings"];

export default function UploadPanel({ onUploaded }) {
  const [category, setCategory] = useState("Residential");
  const [sortOrder, setSortOrder] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast({ variant: "destructive", title: "Image required", description: "Select a photo to publish." });
      return;
    }
    setSubmitting(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      await base44.entities.GalleryPhoto.create({ imageUrl: file_url, category, sortOrder: Number(sortOrder) || 0 });
      toast({ title: "Photo published", description: "Added to your gallery." });
      setCategory("Residential");
      setSortOrder(0);
      setFile(null);
      setPreview("");
      onUploaded?.();
    } catch (err) {
      toast({ variant: "destructive", title: "Upload failed", description: err?.message || "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-background border border-border p-6">
      <h3 className="font-heading font-bold text-lg text-primary">Upload installation photo</h3>
      <div className="mt-4 grid lg:grid-cols-2 gap-6">
        <label className="block border-2 border-dashed border-border p-8 text-center cursor-pointer hover:border-accent transition-colors min-h-[200px] flex items-center justify-center">
          <input type="file" accept="image/*" onChange={onFile} className="hidden" />
          {preview ? (
            <img src={preview} alt="preview" className="max-h-56 mx-auto" />
          ) : (
            <div>
              <Upload className="w-8 h-8 mx-auto text-muted-foreground" />
              <div className="mt-2 font-mono-tech text-[10px] text-muted-foreground">Click to select a high-quality image</div>
            </div>
          )}
        </label>

        <div className="space-y-4">
          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Sort order (lower shows first)">
            <input type="number" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full bg-transparent border-0 focus:outline-none py-1 text-primary" />
          </Field>
        </div>
      </div>

      <button type="submit" disabled={submitting} className="mt-6 inline-flex items-center gap-2 h-12 px-6 bg-accent text-accent-foreground font-mono-tech text-xs active:animate-latch disabled:opacity-60">
        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Publish photo
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