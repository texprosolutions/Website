import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Image } from "@/components/ui/image";
import { Lock, Loader2, GripVertical, Upload, Film, Trash2 } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import UploadPanel from "@/components/gallery/UploadPanel";
import VideoUploadPanel from "@/components/gallery/VideoUploadPanel";
import { useToast } from "@/components/ui/use-toast";

const CATEGORIES = ["Residential", "Commercial", "Gates", "Storage Facilities", "Metal Buildings"];
const FILTERS = ["All", ...CATEGORIES];

export default function GalleryAdmin() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [saving, setSaving] = useState({});
  const [reordering, setReordering] = useState(false);
  const [filter, setFilter] = useState("All");
  const [showUpload, setShowUpload] = useState(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await base44.entities.GalleryPhoto.list("-created_date", 500);
      setPhotos((list || []).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const me = await base44.auth.me();
        setIsAdmin(me?.role === "admin");
      } catch {
        setIsAdmin(false);
      } finally {
        setAuthChecked(true);
      }
    })();
    load();
  }, [load]);

  const saveField = async (id, patch) => {
    setSaving((s) => ({ ...s, [id]: true }));
    try {
      await base44.entities.GalleryPhoto.update(id, patch);
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    } catch (err) {
      toast({ variant: "destructive", title: "Update failed", description: err?.message || "Try again." });
      load();
    } finally {
      setSaving((s) => ({ ...s, [id]: false }));
    }
  };

  const removePhoto = async (id) => {
    if (!window.confirm("Remove this photo from the gallery?")) return;
    setSaving((s) => ({ ...s, [id]: "deleting" }));
    try {
      await base44.entities.GalleryPhoto.delete(id);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      toast({ title: "Photo removed", description: "Live gallery updated." });
    } catch (err) {
      toast({ variant: "destructive", title: "Delete failed", description: err?.message || "Try again." });
    } finally {
      setSaving((s) => ({ ...s, [id]: false }));
    }
  };

  const visible = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  const onDragEnd = async (result) => {
    if (!result.destination || result.destination.index === result.source.index) return;
    const next = [...photos];
    const [moved] = next.splice(result.source.index, 1);
    next.splice(result.destination.index, 0, moved);
    const withOrder = next.map((p, i) => ({ ...p, sortOrder: i + 1 }));
    setPhotos(withOrder);
    setReordering(true);
    try {
      await base44.entities.GalleryPhoto.bulkUpdate(withOrder.map((p) => ({ id: p.id, sortOrder: p.sortOrder })));
      toast({ title: "Order saved", description: "Live gallery updated." });
    } catch (err) {
      toast({ variant: "destructive", title: "Reorder failed", description: err?.message || "Try again." });
      load();
    } finally {
      setReordering(false);
    }
  };

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-accent" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <SiteHeader />
        <main className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center px-6">
            <Lock className="w-8 h-8 mx-auto text-muted-foreground" />
            <h1 className="mt-4 font-heading font-bold text-2xl text-primary">Admins only</h1>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">Sign in with an admin account to manage gallery photo categories and order.</p>
            <Link to="/login" className="mt-6 inline-flex items-center gap-2 font-mono-tech text-xs text-accent hover:underline">
              <Lock className="w-3.5 h-3.5" /> Admin sign in
            </Link>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  const renderRow = (p, i) => (
    <div className="flex items-center gap-4 bg-background border border-border p-3">
      <span className="font-mono-tech text-[10px] text-muted-foreground w-8 text-center flex-shrink-0">{i + 1}</span>
      <div className="w-20 h-20 flex-shrink-0 bg-secondary overflow-hidden">
        <Image src={p.imageUrl} alt="" fittingType="fill" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-mono-tech text-[10px] text-muted-foreground truncate">{p.imageUrl.split("/").pop()}</div>
        <div className="mt-2 flex items-center gap-5 flex-wrap">
          <label className="flex items-center gap-2">
            <span className="font-mono-tech text-[10px] text-muted-foreground">Category</span>
            <select
              value={p.category}
              onChange={(e) => saveField(p.id, { category: e.target.value })}
              className="bg-transparent border-b-2 border-border focus:border-accent focus:outline-none py-1 text-primary text-sm"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>
          <label className="flex items-center gap-2">
            <span className="font-mono-tech text-[10px] text-muted-foreground">Order</span>
            <input
              type="number"
              defaultValue={p.sortOrder ?? 0}
              onBlur={(e) => {
                const v = Number(e.target.value);
                if (!Number.isNaN(v) && v !== (p.sortOrder ?? 0)) saveField(p.id, { sortOrder: v });
              }}
              className="w-20 bg-transparent border-b-2 border-border focus:border-accent focus:outline-none py-1 text-primary text-sm"
            />
          </label>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {saving[p.id] === "deleting" ? (
          <Loader2 className="w-4 h-4 animate-spin text-accent" />
        ) : (
          <button
            onClick={() => removePhoto(p.id)}
            className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] text-destructive hover:text-accent transition-colors"
            aria-label="Remove photo"
          >
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        )}
        {saving[p.id] === true && <Loader2 className="w-4 h-4 animate-spin text-accent" />}
      </div>
    </div>
  );

  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-primary text-primary-foreground py-16">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <span className="font-mono-tech text-xs text-accent">/ Manage Gallery</span>
            <h1 className="mt-4 font-heading font-extrabold text-4xl sm:text-5xl text-balance">Gallery Manager</h1>
            <p className="mt-4 max-w-xl text-primary-foreground/70">
              Drag to reorder how photos appear on the site, and set each photo's category. Changes publish to the live gallery instantly.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => setShowUpload((v) => (v === "photo" ? null : "photo"))}
                className="inline-flex items-center gap-2 h-12 px-6 bg-accent text-accent-foreground font-mono-tech text-xs active:animate-latch"
              >
                <Upload className="w-4 h-4" /> {showUpload === "photo" ? "Close photo uploader" : "Upload photos"}
              </button>
              <button
                onClick={() => setShowUpload((v) => (v === "video" ? null : "video"))}
                className="inline-flex items-center gap-2 h-12 px-6 border-2 border-primary-foreground text-primary-foreground font-mono-tech text-xs hover:border-accent hover:text-accent transition-colors"
              >
                <Film className="w-4 h-4" /> {showUpload === "video" ? "Close video uploader" : "Upload videos"}
              </button>
            </div>
          </div>
        </section>

        {showUpload === "photo" && (
          <section className="py-10 bg-accent/5 border-b border-border">
            <div className="mx-auto max-w-monolith px-6 lg:px-10">
              <UploadPanel onUploaded={load} />
            </div>
          </section>
        )}
        {showUpload === "video" && (
          <section className="py-10 bg-accent/5 border-b border-border">
            <div className="mx-auto max-w-monolith px-6 lg:px-10">
              <VideoUploadPanel onUploaded={load} />
            </div>
          </section>
        )}

        <section className="py-12 bg-background">
          <div className="mx-auto max-w-monolith px-6 lg:px-10">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="font-mono-tech text-xs text-muted-foreground">
                {visible.length} photo{visible.length === 1 ? "" : "s"}{filter !== "All" ? ` · ${filter}` : ""}
                {reordering && <span className="ml-2 text-accent">saving order…</span>}
              </div>
              <Link to="/gallery" className="font-mono-tech text-xs text-accent hover:underline">View live gallery →</Link>
            </div>

            {/* Category filter */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-6 mb-2 border-b border-border">
              {FILTERS.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`px-4 h-10 font-mono-tech text-[11px] whitespace-nowrap border transition-colors ${filter === c ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:text-primary"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            {filter !== "All" && (
              <p className="mt-4 font-mono-tech text-[10px] text-muted-foreground">
                Drag-reorder is available in the “All” view. Here you can change a photo’s category or type a new order number.
              </p>
            )}

            {loading ? (
              <div className="flex items-center justify-center py-24">
                <Loader2 className="w-6 h-6 animate-spin text-accent" />
              </div>
            ) : visible.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">No photos in this category yet.</p>
            ) : filter === "All" ? (
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="gallery-list">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="mt-6 space-y-3">
                      {visible.map((p, i) => (
                        <Draggable key={p.id} draggableId={p.id} index={i}>
                          {(prov, snap) => (
                            <div
                              ref={prov.innerRef}
                              {...prov.draggableProps}
                              className={`flex items-stretch ${snap.isDragging ? "opacity-90" : ""}`}
                            >
                              <span
                                {...prov.dragHandleProps}
                                className="flex items-center px-2 cursor-grab active:cursor-grabbing text-muted-foreground hover:text-accent bg-secondary/50 border border-border border-r-0"
                                aria-label="Drag to reorder"
                              >
                                <GripVertical className="w-5 h-5" />
                              </span>
                              <div className="flex-1 min-w-0">
                                {renderRow(p, i)}
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="mt-6 space-y-3">
                {visible.map((p) => renderRow(p, photos.indexOf(p)))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}