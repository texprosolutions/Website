import { useEffect, useState, useCallback } from "react";
import { base44 } from "@/api/base44Client";

/**
 * Loads all GalleryPhoto records (sorted by sortOrder) and stays in sync
 * with live create/update/delete events so the homepage reflects gallery
 * changes instantly.
 */
export function useGalleryPhotos() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const list = await base44.entities.GalleryPhoto.list("-created_date", 500);
      setPhotos((list || []).slice().sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)));
    } catch {
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const unsubscribe = base44.entities.GalleryPhoto.subscribe((event) => {
      setPhotos((prev) => {
        if (event.type === "create" && event.data?.imageUrl) {
          return [...prev, event.data].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        }
        if (event.type === "update" && event.data?.id) {
          return prev
            .map((p) => (p.id === event.data.id ? { ...p, ...event.data } : p))
            .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        }
        if (event.type === "delete" && event.id) {
          return prev.filter((p) => p.id !== event.id);
        }
        return prev;
      });
    });
    return unsubscribe;
  }, []);

  return { photos, loading };
}