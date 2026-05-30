"use client";

import { FormEvent, useEffect, useState } from "react";
import type { ProductCategoryItem } from "@/lib/catalog-types";
import { slugify } from "@/lib/slugify";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  background: "#fff",
};

type CategoryForm = {
  name: string;
  slug: string;
  description: string;
};

function emptyForm(): CategoryForm {
  return { name: "", slug: "", description: "" };
}

function normalizeForm(input: Partial<CategoryForm>): CategoryForm {
  return {
    name: input.name ?? "",
    slug: input.slug ?? "",
    description: input.description ?? "",
  };
}

type Props = {
  onCategoriesChange?: () => void;
};

export default function ProductCategoriesPanel({ onCategoriesChange }: Props) {
  const [categories, setCategories] = useState<ProductCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [form, setForm] = useState<CategoryForm>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selected, setSelected] = useState<ProductCategoryItem | null>(null);
  const [error, setError] = useState("");

  async function loadCategories() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/dashboard/product-categories", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed loading categories.");
      const json = await res.json();
      setCategories(json.categories || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load categories.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadCategories();
  }, []);

  function patchForm(patch: Partial<CategoryForm>) {
    setForm((prev) => {
      const next = normalizeForm({ ...prev, ...patch });
      if (patch.name && !editingId && !prev.slug.trim()) {
        next.slug = slugify(patch.name);
      }
      return next;
    });
  }

  function openCreate() {
    setEditingId(null);
    setSelected(null);
    setForm(emptyForm());
    setModal("create");
  }

  function openEdit(item: ProductCategoryItem) {
    setEditingId(item.id);
    setSelected(item);
    setForm(
      normalizeForm({
        name: item.name,
        slug: item.slug,
        description: item.description ?? "",
      }),
    );
    setModal("edit");
  }

  function openDelete(item: ProductCategoryItem) {
    setSelected(item);
    setModal("delete");
  }

  function closeModal() {
    setModal(null);
    setSelected(null);
    setEditingId(null);
    setForm(emptyForm());
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const endpoint = editingId
      ? `/api/dashboard/product-categories/${editingId}`
      : "/api/dashboard/product-categories";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      setError(json.error || "Could not save category.");
      return;
    }
    closeModal();
    await loadCategories();
    onCategoriesChange?.();
    setError("");
  }

  async function onDelete(id: string) {
    const res = await fetch(`/api/dashboard/product-categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Could not delete category.");
      return;
    }
    closeModal();
    await loadCategories();
    onCategoriesChange?.();
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
        <div>
          <h2 style={{ fontSize: 20, margin: "0 0 4px" }}>Product Categories</h2>
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-mid)" }}>
            Categories appear as sub-tabs under Products in the navbar and on category pages.
          </p>
        </div>
        <button className="elemen-btn-primary" type="button" onClick={openCreate}>
          Create Category
        </button>
      </div>

      {error ? <p style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</p> : null}
      {loading ? <p>Loading categories...</p> : null}

      {!loading ? (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead>
              <tr style={{ background: "var(--bg-cream)" }}>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Name</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Slug</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Page</th>
                <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((item) => (
                <tr key={item.id}>
                  <td style={{ padding: 12, border: "1px solid var(--border)", fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>{item.slug}</td>
                  <td style={{ padding: 12, border: "1px solid var(--border)", color: "var(--text-mid)" }}>
                    /products/category/{item.slug}
                  </td>
                  <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        type="button"
                        onClick={() => openEdit(item)}
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
                        onClick={() => openDelete(item)}
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
        </div>
      ) : null}

      {(modal === "create" || modal === "edit") ? (
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
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <form
            onSubmit={(e) => void onSubmit(e)}
            style={{
              width: "100%",
              maxWidth: 480,
              background: "#fff",
              borderRadius: 14,
              border: "1px solid var(--border)",
              padding: 18,
            }}
          >
            <h3 style={{ margin: "0 0 14px", fontSize: 22, color: "var(--navy)" }}>
              {modal === "create" ? "Create Category" : "Edit Category"}
            </h3>
            <div style={{ display: "grid", gap: 12 }}>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600 }}>
                Category name
                <input
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => patchForm({ name: e.target.value })}
                  required
                />
              </label>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600 }}>
                URL slug
                <input
                  style={inputStyle}
                  value={form.slug}
                  onChange={(e) => patchForm({ slug: slugify(e.target.value) })}
                  required
                />
              </label>
              <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600 }}>
                Description (optional)
                <textarea
                  style={{ ...inputStyle, minHeight: 70 }}
                  value={form.description}
                  onChange={(e) => patchForm({ description: e.target.value })}
                />
              </label>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
              <button type="button" className="elemen-btn-outline" onClick={closeModal}>
                Cancel
              </button>
              <button className="elemen-btn-primary" type="submit">
                {modal === "create" ? "Create" : "Save"}
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {modal === "delete" && selected ? (
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
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 440,
              background: "#fff",
              borderRadius: 14,
              border: "1px solid var(--border)",
              padding: 18,
            }}
          >
            <h3 style={{ margin: "0 0 10px", fontSize: 22, color: "var(--navy)" }}>Delete Category</h3>
            <p style={{ margin: "0 0 16px", color: "var(--text-mid)", lineHeight: 1.6 }}>
              Delete <strong>{selected.name}</strong>? Products in this category will remain but the category page
              will be removed.
            </p>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button type="button" className="elemen-btn-outline" onClick={closeModal}>
                Cancel
              </button>
              <button
                type="button"
                className="elemen-btn-primary"
                style={{ background: "var(--wine-berry)" }}
                onClick={() => void onDelete(selected.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
