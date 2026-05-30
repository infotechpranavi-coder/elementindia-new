"use client";

import { FormEvent, useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { BlogPost } from "@/lib/catalog-types";
import { BLOG_CATEGORIES, isBlogCategory } from "@/lib/blog-categories";
import {
  blogToForm,
  emptyBlogForm,
  formToBlogPayload,
  normalizeBlogForm,
  type BlogFormState,
} from "@/lib/normalize-blog-form";
import { slugify } from "@/lib/slugify";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  background: "#fff",
};

type ImageMode = "upload" | "url";

export default function BlogsPanel() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [blogForm, setBlogForm] = useState<BlogFormState>(emptyBlogForm());
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogModal, setBlogModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [imageMode, setImageMode] = useState<ImageMode>("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sourceImageUrl, setSourceImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [lastUploadMode, setLastUploadMode] = useState<ImageMode | null>(null);
  const [error, setError] = useState("");

  async function loadBlogs() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/blogs", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed loading blogs.");
      const json = await res.json();
      setBlogs(json.blogs || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load blogs.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadBlogs();
  }, []);

  useEffect(() => {
    if (!blogModal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeBlogModal();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [blogModal]);

  function patchBlogForm(patch: Partial<BlogFormState>) {
    setBlogForm((prev) => {
      const merged = normalizeBlogForm({ ...prev, ...patch });
      if (patch.title && !editingBlogId && !prev.slug.trim()) {
        merged.slug = slugify(patch.title);
      }
      return merged;
    });
  }

  async function onBlogSubmit(e: FormEvent) {
    e.preventDefault();
    if (!blogForm.imageUrl.trim()) {
      setError("Please upload a featured image before saving.");
      return false;
    }
    if (!isBlogCategory(blogForm.category)) {
      setError("Select a blog category.");
      return false;
    }
    const payload = formToBlogPayload(blogForm);
    const endpoint = editingBlogId
      ? `/api/dashboard/blogs/${editingBlogId}`
      : "/api/dashboard/blogs";
    const method = editingBlogId ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      setError("Could not save blog. Check all fields.");
      return false;
    }
    await loadBlogs();
    setError("");
    return true;
  }

  async function onDeleteBlog(id: string) {
    const res = await fetch(`/api/dashboard/blogs/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete blog.");
      return;
    }
    closeBlogModal();
    await loadBlogs();
  }

  async function uploadBlogImage() {
    setImageUploadError("");
    setUploadingImage(true);
    try {
      const formData = new FormData();
      if (imageMode === "upload") {
        if (!imageFile) {
          setImageUploadError("Choose an image file first.");
          return;
        }
        formData.append("file", imageFile);
      } else {
        if (!sourceImageUrl.trim()) {
          setImageUploadError("Enter an image URL first.");
          return;
        }
        formData.append("url", sourceImageUrl.trim());
      }
      const res = await fetch("/api/uploads/image", { method: "POST", body: formData });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Upload failed.");
      patchBlogForm({ imageUrl: String(json.url ?? "") });
      setLastUploadMode(imageMode);
      setImageFile(null);
      setSourceImageUrl("");
    } catch (e) {
      setImageUploadError(e instanceof Error ? e.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  function openCreateBlogModal() {
    setEditingBlogId(null);
    setSelectedBlog(null);
    setBlogForm(emptyBlogForm());
    setImageMode("upload");
    setImageFile(null);
    setSourceImageUrl("");
    setImageUploadError("");
    setLastUploadMode(null);
    setBlogModal("create");
  }

  function openEditBlogModal(item: BlogPost) {
    setEditingBlogId(item.id);
    setSelectedBlog(item);
    setBlogForm(blogToForm(item));
    setImageMode("url");
    setImageFile(null);
    setSourceImageUrl(item.imageUrl || "");
    setImageUploadError("");
    setLastUploadMode(null);
    setBlogModal("edit");
  }

  function openDeleteBlogModal(item: BlogPost) {
    setSelectedBlog(item);
    setBlogModal("delete");
  }

  function closeBlogModal() {
    setBlogModal(null);
    setSelectedBlog(null);
    setEditingBlogId(null);
    setBlogForm(emptyBlogForm());
    setImageFile(null);
    setSourceImageUrl("");
    setImageUploadError("");
    setLastUploadMode(null);
  }

  return (
    <section
      style={{
        background: "#fff",
        border: "1px solid var(--border)",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <h2 style={{ fontSize: 20, margin: 0 }}>Blogs & Articles</h2>
        <button className="elemen-btn-primary" type="button" onClick={openCreateBlogModal}>
          Create Blog
        </button>
      </div>

      {error ? <p style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</p> : null}
      {loading ? <p>Loading blogs...</p> : null}

      {!loading ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 980 }}>
            <thead>
              <tr style={{ background: "var(--bg-cream)" }}>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Image</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Title</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Category</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Date</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Status</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      style={{ width: 58, height: 44, objectFit: "cover", borderRadius: 6 }}
                    />
                  </td>
                  <td style={{ padding: 12, border: "1px solid var(--border)", fontWeight: 600 }}>{item.title}</td>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>{item.category}</td>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                    {new Date(item.publishedAt).toLocaleDateString("en-IN")}
                  </td>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                    {item.published ? "Published" : "Draft"}
                  </td>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => openEditBlogModal(item)}
                        style={{
                          border: "1px solid var(--navy)",
                          background: "transparent",
                          color: "var(--navy)",
                          borderRadius: 6,
                          padding: "7px 12px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteBlogModal(item)}
                        style={{
                          border: "1px solid var(--wine-berry)",
                          background: "var(--wine-berry)",
                          color: "#fff",
                          borderRadius: 6,
                          padding: "7px 12px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {blogs.length === 0 ? (
            <p style={{ color: "var(--text-mid)", marginTop: 16 }}>No blogs yet. Create your first article.</p>
          ) : null}
        </div>
      ) : null}

      {(blogModal === "create" || blogModal === "edit") ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20, 30, 51, 0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 60,
            padding: 20,
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeBlogModal();
          }}
        >
          <form
            onSubmit={async (e) => {
              const ok = await onBlogSubmit(e);
              if (ok) closeBlogModal();
            }}
            role="dialog"
            aria-modal="true"
            style={{
              width: "100%",
              maxWidth: 640,
              background: "#fff",
              borderRadius: 14,
              border: "1px solid var(--border)",
              padding: 18,
              maxHeight: "92vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3 style={{ margin: "0 0 14px", fontSize: 22, color: "var(--navy)" }}>
              {blogModal === "create" ? "Create Blog" : "Edit Blog"}
            </h3>
            <div style={{ display: "grid", gap: 14, overflowY: "auto", paddingRight: 4 }}>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                Title
                <input
                  style={inputStyle}
                  value={blogForm.title}
                  onChange={(e) => patchBlogForm({ title: e.target.value })}
                  required
                />
              </label>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                URL slug
                <input
                  style={inputStyle}
                  value={blogForm.slug}
                  onChange={(e) => patchBlogForm({ slug: slugify(e.target.value) })}
                  placeholder="auto-generated-from-title"
                  required
                />
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Category
                  <select
                    style={inputStyle}
                    value={blogForm.category}
                    onChange={(e) => patchBlogForm({ category: e.target.value })}
                    required
                  >
                    <option value="">Select category</option>
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </label>
                <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                  Publish date
                  <input
                    style={inputStyle}
                    type="date"
                    value={blogForm.publishedAt}
                    onChange={(e) => patchBlogForm({ publishedAt: e.target.value })}
                    required
                  />
                </label>
              </div>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                Excerpt (short summary)
                <textarea
                  style={{ ...inputStyle, minHeight: 70 }}
                  value={blogForm.excerpt}
                  onChange={(e) => patchBlogForm({ excerpt: e.target.value })}
                  required
                />
              </label>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                Article content
                <textarea
                  style={{ ...inputStyle, minHeight: 160 }}
                  value={blogForm.content}
                  onChange={(e) => patchBlogForm({ content: e.target.value })}
                  placeholder="Write paragraphs separated by a blank line..."
                  required
                />
              </label>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                Read time (minutes)
                <input
                  style={inputStyle}
                  type="number"
                  min={1}
                  value={blogForm.readTimeMinutes}
                  onChange={(e) =>
                    patchBlogForm({ readTimeMinutes: Number.parseInt(e.target.value, 10) || 1 })
                  }
                />
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600 }}>
                <input
                  type="checkbox"
                  checked={blogForm.published}
                  onChange={(e) => patchBlogForm({ published: e.target.checked })}
                />
                Published (visible on homepage and /blogs)
              </label>

              <section
                style={{
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  padding: 12,
                  background: "var(--bg-cream)",
                }}
              >
                <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>
                  Featured Image
                </p>
                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                  <button
                    type="button"
                    onClick={() => setImageMode("upload")}
                    style={{
                      border: imageMode === "upload" ? "1px solid var(--gold)" : "1px solid var(--border)",
                      background: imageMode === "upload" ? "var(--wine-berry)" : "#fff",
                      color: imageMode === "upload" ? "#fff" : "var(--navy)",
                      borderRadius: 8,
                      padding: "7px 10px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode("url")}
                    style={{
                      border: imageMode === "url" ? "1px solid var(--gold)" : "1px solid var(--border)",
                      background: imageMode === "url" ? "var(--wine-berry)" : "#fff",
                      color: imageMode === "url" ? "#fff" : "var(--navy)",
                      borderRadius: 8,
                      padding: "7px 10px",
                      cursor: "pointer",
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Image URL
                  </button>
                </div>
                {imageMode === "upload" ? (
                  <div style={{ display: "grid", gap: 8 }}>
                    <input
                      key={`blog-file-${editingBlogId ?? "new"}-${blogModal}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      style={inputStyle}
                    />
                    <button
                      type="button"
                      className="elemen-btn-primary"
                      style={{ padding: "10px 16px", width: "fit-content" }}
                      disabled={uploadingImage}
                      onClick={() => void uploadBlogImage()}
                    >
                      {uploadingImage ? "Uploading..." : "Upload to Cloudinary"}
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: 8 }}>
                    <input
                      style={inputStyle}
                      placeholder="https://example.com/image.jpg"
                      value={sourceImageUrl}
                      onChange={(e) => setSourceImageUrl(e.target.value)}
                    />
                    <button
                      type="button"
                      className="elemen-btn-primary"
                      style={{ padding: "10px 16px", width: "fit-content" }}
                      disabled={uploadingImage}
                      onClick={() => void uploadBlogImage()}
                    >
                      {uploadingImage ? "Saving..." : "Fetch URL & Save"}
                    </button>
                  </div>
                )}
                {imageUploadError ? (
                  <p style={{ margin: "10px 0 0", fontSize: 12, color: "#b91c1c" }}>{imageUploadError}</p>
                ) : null}
                {lastUploadMode && blogForm.imageUrl ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#0f7a3b",
                      background: "#eefaf2",
                      border: "1px solid #b8e4c7",
                      borderRadius: 8,
                      padding: "10px 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      marginTop: 10,
                    }}
                  >
                    <CheckCircle2 size={16} />
                    Image ready.
                  </div>
                ) : null}
                {blogForm.imageUrl ? (
                  <div
                    style={{
                      border: "1px solid var(--border)",
                      borderRadius: 10,
                      overflow: "hidden",
                      maxWidth: 280,
                      marginTop: 10,
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blogForm.imageUrl}
                      alt="Blog preview"
                      style={{ width: "100%", height: 160, objectFit: "cover" }}
                    />
                  </div>
                ) : null}
              </section>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                marginTop: 14,
                paddingTop: 12,
                borderTop: "1px solid var(--border)",
              }}
            >
              <button type="button" className="elemen-btn-outline" onClick={closeBlogModal}>
                Cancel
              </button>
              <button className="elemen-btn-primary" type="submit">
                {blogModal === "create" ? "Create" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {blogModal === "delete" && selectedBlog ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(20, 30, 51, 0.55)",
            display: "grid",
            placeItems: "center",
            zIndex: 60,
            padding: 20,
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeBlogModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            style={{
              width: "100%",
              maxWidth: 480,
              background: "#fff",
              borderRadius: 14,
              border: "1px solid var(--border)",
              padding: 18,
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: 22, color: "var(--navy)" }}>Delete Blog</h3>
            <p style={{ margin: "0 0 16px", color: "var(--text-mid)", lineHeight: 1.6 }}>
              Delete <strong>{selectedBlog.title}</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button type="button" className="elemen-btn-outline" onClick={closeBlogModal}>
                Cancel
              </button>
              <button
                type="button"
                className="elemen-btn-primary"
                style={{ background: "var(--wine-berry)" }}
                onClick={() => void onDeleteBlog(selectedBlog.id)}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
