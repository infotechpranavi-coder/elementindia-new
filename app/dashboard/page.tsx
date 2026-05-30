"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Boxes,
  CheckCircle2,
  FileText,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Tags,
} from "lucide-react";
import BlogsPanel from "@/components/dashboard/BlogsPanel";
import ProductCategoriesPanel from "@/components/dashboard/ProductCategoriesPanel";
import type { ProductCategoryItem, ProductItem } from "@/lib/catalog-types";
import { productMatchesCategory } from "@/lib/product-category-match";
import {
  emptyProductForm,
  normalizeProductForm,
  productToForm,
  type ProductFormState,
} from "@/lib/normalize-product-form";

type DashboardTab = "overview" | "categories" | "products" | "blogs";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid var(--border)",
  borderRadius: 8,
  padding: "10px 12px",
  fontSize: 14,
  background: "#fff",
};

type ProductImageMode = "upload" | "url";

export default function DashboardPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [productCategories, setProductCategories] = useState<ProductCategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>("products");

  const [productForm, setProductForm] = useState<ProductFormState>(emptyProductForm);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productModal, setProductModal] = useState<"create" | "edit" | "delete" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [imageMode, setImageMode] = useState<ProductImageMode>("upload");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [sourceImageUrl, setSourceImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState("");
  const [lastUploadMode, setLastUploadMode] = useState<ProductImageMode | null>(null);
  const [error, setError] = useState("");

  const stats = useMemo(
    () => [
      {
        id: "stat-total-products",
        label: "Total Products",
        value: products.length,
        icon: <Boxes size={18} color="var(--wine-berry)" />,
      },
      ...productCategories.map((cat) => ({
        id: cat.id,
        label: cat.name,
        value: products.filter((item) => productMatchesCategory(item, cat)).length,
        icon: <FolderKanban size={18} color="var(--wine-berry)" />,
      })),
    ],
    [products, productCategories],
  );

  async function loadProductCategories() {
    try {
      const cRes = await fetch("/api/dashboard/product-categories", { cache: "no-store" });
      if (!cRes.ok) return;
      const cJson = await cRes.json();
      setProductCategories(cJson.categories || []);
    } catch {
      /* keep existing list */
    }
  }

  async function loadData() {
    setLoading(true);
    setError("");
    try {
      const [pRes, cRes] = await Promise.all([
        fetch("/api/dashboard/products", { cache: "no-store" }),
        fetch("/api/dashboard/product-categories", { cache: "no-store" }),
      ]);
      if (!pRes.ok || !cRes.ok) throw new Error("Failed loading dashboard data.");
      const pJson = await pRes.json();
      const cJson = await cRes.json();
      setProducts(pJson.products || []);
      setProductCategories(cJson.categories || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Data bootstrap is intentionally done on first mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadData();
  }, []);

  useEffect(() => {
    if (activeTab === "products" || activeTab === "categories") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void loadProductCategories();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!productModal) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeProductModal();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [productModal]);

  async function onProductSubmit(e: FormEvent) {
    e.preventDefault();
    if (!productForm.imageUrl.trim()) {
      setError("Please upload a product image before saving.");
      return false;
    }
    if (!productForm.category.trim() || !productCategories.some((cat) => cat.slug === productForm.category)) {
      setError("Select a product category. Create one in the Manage Categories tab first.");
      return false;
    }
    const endpoint = editingProductId
      ? `/api/dashboard/products/${editingProductId}`
      : "/api/dashboard/products";
    const method = editingProductId ? "PUT" : "POST";
    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productForm),
    });
    if (!res.ok) {
      setError("Unable to save product.");
      return false;
    }
    setProductForm(emptyProductForm());
    setEditingProductId(null);
    setProductModal(null);
    setSelectedProduct(null);
    await loadData();
    return true;
  }

  function patchProductForm(patch: Partial<ProductFormState>) {
    setProductForm((prev) => normalizeProductForm({ ...prev, ...patch }));
  }

  async function onDeleteProduct(id: string) {
    const res = await fetch(`/api/dashboard/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      setError("Unable to delete product.");
      return;
    }
    setProductModal(null);
    setSelectedProduct(null);
    await loadData();
  }

  async function uploadProductImage() {
    setImageUploadError("");
    const formData = new FormData();

    if (imageMode === "upload") {
      if (!imageFile) {
        setImageUploadError("Select an image file first.");
        return;
      }
      formData.append("file", imageFile);
    } else {
      if (!sourceImageUrl.trim()) {
        setImageUploadError("Enter a valid image URL first.");
        return;
      }
      formData.append("imageUrl", sourceImageUrl.trim());
    }

    setUploadingImage(true);
    try {
      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();
      if (!res.ok || !json.url) {
        throw new Error(json.error || "Image upload failed.");
      }
      patchProductForm({ imageUrl: String(json.url ?? "") });
      setLastUploadMode(imageMode);
      setImageFile(null);
      setSourceImageUrl("");
    } catch (e) {
      setImageUploadError(e instanceof Error ? e.message : "Image upload failed.");
    } finally {
      setUploadingImage(false);
    }
  }

  const navItems: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <LayoutDashboard size={16} /> },
    { id: "categories", label: "Manage Categories", icon: <Tags size={16} /> },
    { id: "products", label: "Manage Products", icon: <FolderKanban size={16} /> },
    { id: "blogs", label: "Manage Blogs", icon: <FileText size={16} /> },
  ];

  function openCreateProductModal() {
    void loadProductCategories();
    setEditingProductId(null);
    setSelectedProduct(null);
    setProductForm(emptyProductForm());
    setImageMode("upload");
    setImageFile(null);
    setSourceImageUrl("");
    setImageUploadError("");
    setLastUploadMode(null);
    setProductModal("create");
  }

  function openEditProductModal(item: ProductItem) {
    void loadProductCategories();
    setEditingProductId(item.id);
    setSelectedProduct(item);
    const matched = productCategories.find((cat) => productMatchesCategory(item, cat));
    setProductForm(
      productToForm({
        ...item,
        category: matched?.slug ?? item.category,
      }),
    );
    setImageMode("url");
    setImageFile(null);
    setSourceImageUrl(item.imageUrl || "");
    setImageUploadError("");
    setLastUploadMode(null);
    setProductModal("edit");
  }

  function openDeleteProductModal(item: ProductItem) {
    setSelectedProduct(item);
    setProductModal("delete");
  }

  function closeProductModal() {
    setProductModal(null);
    setSelectedProduct(null);
    setEditingProductId(null);
    setProductForm(emptyProductForm());
    setImageFile(null);
    setSourceImageUrl("");
    setImageUploadError("");
    setLastUploadMode(null);
  }

  return (
    <main style={{ background: "var(--bg-light)", minHeight: "100vh" }}>
      <section style={{ display: "grid", gridTemplateColumns: "250px 1fr", minHeight: "100vh" }}>
        <aside
          style={{
            background: "var(--navy-dark)",
            color: "#d7e0f0",
            padding: "24px 16px",
            borderRight: "1px solid var(--navy)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 style={{ color: "#fff", fontSize: 24, margin: "6px 8px 2px" }}>ADMIN</h2>
          <p style={{ color: "#b6bfd2", fontSize: 11, letterSpacing: 1.2, margin: "0 8px 20px" }}>
            CONSOLE PANEL
          </p>
          <div style={{ display: "grid", gap: 8 }}>
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "11px 12px",
                    borderRadius: 10,
                    border: active ? "1px solid var(--gold)" : "1px solid transparent",
                    background: active ? "var(--wine-berry)" : "transparent",
                    color: active ? "#fff" : "#d7deeb",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            style={{
              marginTop: "auto",
              border: "none",
              background: "transparent",
              color: "#f08a8a",
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 13,
              cursor: "pointer",
              padding: "10px 8px",
            }}
          >
            <LogOut size={14} />
            Log Out
          </button>
        </aside>

        <div style={{ padding: 28 }}>
          <h1 style={{ fontSize: 48, margin: 0, color: "var(--navy)", lineHeight: 1 }}>
            OVERVIEW <span style={{ color: "var(--wine-berry)", fontStyle: "italic" }}>PANEL</span>
          </h1>
          <div
            style={{
              marginTop: 16,
              marginBottom: 16,
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid var(--gold-light)",
              background: "#f8f2e8",
              color: "var(--wine-berry)",
              fontSize: 14,
              maxWidth: 380,
            }}
          >
            Welcome back, Admin!
          </div>

          {error ? <p style={{ color: "#b91c1c", marginBottom: 12 }}>{error}</p> : null}
          {loading ? <p>Loading dashboard data...</p> : null}

          {!loading ? (
            <>
              <section
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 14,
                  marginBottom: 18,
                }}
              >
                {stats.map((item) => (
                  <article
                    key={item.id}
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      borderRadius: 16,
                      padding: 16,
                    }}
                  >
                    <div style={{ marginBottom: 10 }}>{item.icon}</div>
                    <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--text-light)", fontWeight: 600 }}>
                      {item.label}
                    </p>
                    <p style={{ margin: 0, fontSize: 32, fontWeight: 700, color: "var(--navy)" }}>
                      {item.value}
                    </p>
                  </article>
                ))}
              </section>

              {activeTab === "overview" ? (
                <section
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: 20,
                  }}
                >
                  <h2 style={{ margin: "0 0 8px", fontSize: 24, color: "var(--navy)" }}>Overview</h2>
                  <p style={{ margin: 0, color: "var(--text-mid)", lineHeight: 1.7 }}>
                    Use <strong>Manage Categories</strong> to create product sub-tabs for the navbar.
                    Use <strong>Manage Products</strong> to assign items to those categories.
                    Each category gets its own page at /products/category/[slug].
                  </p>
                </section>
              ) : null}

              {activeTab === "categories" ? (
                <ProductCategoriesPanel onCategoriesChange={() => void loadData()} />
              ) : null}

              {activeTab === "products" ? (
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
                    <h2 style={{ fontSize: 20, margin: 0 }}>Products Table</h2>
                    <button className="elemen-btn-primary" type="button" onClick={openCreateProductModal}>
                      Create Product
                    </button>
                  </div>

                  <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
                      <thead>
                        <tr style={{ background: "var(--bg-cream)" }}>
                          <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Image</th>
                          <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Name</th>
                          <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Category</th>
                          <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Price</th>
                          <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Description</th>
                          <th style={{ textAlign: "left", padding: 12, border: "1px solid var(--border)" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((item) => (
                          <tr key={item.id}>
                            <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{ width: 58, height: 44, objectFit: "cover", borderRadius: 6 }}
                              />
                            </td>
                            <td style={{ padding: 12, border: "1px solid var(--border)", fontWeight: 600 }}>{item.name}</td>
                            <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                              {productCategories.find((cat) => productMatchesCategory(item, cat))?.name ??
                                item.category}
                            </td>
                            <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                              {item.price != null && Number.isFinite(item.price)
                                ? `Rs. ${item.price.toLocaleString("en-IN")}`
                                : "—"}
                            </td>
                            <td style={{ padding: 12, border: "1px solid var(--border)", color: "var(--text-mid)" }}>
                              {item.description.length > 90 ? `${item.description.slice(0, 90)}...` : item.description}
                            </td>
                            <td style={{ padding: 12, border: "1px solid var(--border)" }}>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button
                                  type="button"
                                  onClick={() => openEditProductModal(item)}
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
                                  onClick={() => openDeleteProductModal(item)}
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
                </section>
              ) : null}

              {activeTab === "blogs" ? <BlogsPanel /> : null}

              {(productModal === "create" || productModal === "edit") ? (
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
                    if (e.target === e.currentTarget) closeProductModal();
                  }}
                >
                  <form
                    onSubmit={async (e) => {
                      const ok = await onProductSubmit(e);
                      if (ok) closeProductModal();
                    }}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="product-modal-title"
                    style={{
                      width: "100%",
                      maxWidth: 560,
                      background: "#fff",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      padding: 18,
                      maxHeight: "92vh",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h3 id="product-modal-title" style={{ margin: "0 0 14px", fontSize: 22, color: "var(--navy)" }}>
                      {productModal === "create" ? "Create Product" : "Edit Product"}
                    </h3>
                    <div style={{ display: "grid", gap: 14, overflowY: "auto", paddingRight: 4 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                          Product Name
                          <input
                            style={inputStyle}
                            placeholder="e.g. 4MP Dome Camera"
                            value={productForm.name}
                            onChange={(e) => patchProductForm({ name: e.target.value })}
                            required
                          />
                        </label>
                        <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                          Price (INR) <span style={{ fontWeight: 400, color: "var(--text-mid)" }}>(optional)</span>
                          <input
                            style={inputStyle}
                            type="number"
                            min={0}
                            placeholder="Leave empty if price on request"
                            value={
                              productForm.price != null && Number.isFinite(productForm.price)
                                ? productForm.price
                                : ""
                            }
                            onChange={(e) => {
                              const raw = e.target.value;
                              patchProductForm({
                                price: raw === "" ? undefined : Number.parseFloat(raw),
                              });
                            }}
                          />
                        </label>
                      </div>

                      <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                        Product category
                        <select
                          style={inputStyle}
                          value={productForm.category}
                          onChange={(e) => patchProductForm({ category: e.target.value })}
                          required
                          disabled={productCategories.length === 0}
                        >
                          <option value="">
                            {productCategories.length === 0
                              ? "No categories — create one in Manage Categories"
                              : "Select which category this product belongs to"}
                          </option>
                          {productCategories.map((cat) => (
                            <option key={cat.id} value={cat.slug}>
                              {cat.name}
                            </option>
                          ))}
                        </select>
                        {productForm.category ? (
                          <span style={{ fontSize: 12, color: "var(--text-mid)", fontWeight: 400 }}>
                            Listed under Products →{" "}
                            {productCategories.find((c) => c.slug === productForm.category)?.name ??
                              productForm.category}{" "}
                            in navbar · page: /products/category/{productForm.category}
                          </span>
                        ) : (
                          <span style={{ fontSize: 12, color: "var(--text-mid)", fontWeight: 400 }}>
                            Choose a category created in the Manage Categories tab. The product will
                            appear on that category&apos;s navbar sub-tab and showcase page.
                          </span>
                        )}
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
                          Product Image (saved on Cloudinary)
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
                            Upload Local File
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
                            Use Image URL
                          </button>
                        </div>

                        {imageMode === "upload" ? (
                          <div style={{ display: "grid", gap: 8 }}>
                            <input
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
                              onClick={() => void uploadProductImage()}
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
                              onClick={() => void uploadProductImage()}
                            >
                              {uploadingImage ? "Saving..." : "Fetch URL & Save to Cloudinary"}
                            </button>
                          </div>
                        )}

                        {imageUploadError ? (
                          <p style={{ margin: "10px 0 0", fontSize: 12, color: "#b91c1c" }}>{imageUploadError}</p>
                        ) : null}
                      </section>

                      {lastUploadMode === "upload" && productForm.imageUrl ? (
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
                          }}
                        >
                          <CheckCircle2 size={16} />
                          Image uploaded to Cloudinary.
                        </div>
                      ) : null}

                      {lastUploadMode === "url" && productForm.imageUrl ? (
                        <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                          Uploaded URL
                          <input style={inputStyle} value={productForm.imageUrl ?? ""} readOnly />
                        </label>
                      ) : null}

                      {productForm.imageUrl ? (
                        <div style={{ border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", maxWidth: 280 }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={productForm.imageUrl} alt="Product preview" style={{ width: "100%", height: 160, objectFit: "cover" }} />
                        </div>
                      ) : null}

                      <label style={{ display: "grid", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>
                        Product Description
                        <textarea
                          style={{ ...inputStyle, minHeight: 90 }}
                          placeholder="Enter short product details..."
                          value={productForm.description}
                          onChange={(e) => patchProductForm({ description: e.target.value })}
                          required
                        />
                      </label>
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
                      <button type="button" className="elemen-btn-outline" onClick={closeProductModal}>
                        Cancel
                      </button>
                      <button className="elemen-btn-primary" type="submit">
                        {productModal === "create" ? "Create" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : null}

              {productModal === "delete" && selectedProduct ? (
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
                    if (e.target === e.currentTarget) closeProductModal();
                  }}
                >
                  <div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="delete-product-modal-title"
                    style={{
                      width: "100%",
                      maxWidth: 480,
                      background: "#fff",
                      borderRadius: 14,
                      border: "1px solid var(--border)",
                      padding: 18,
                    }}
                  >
                    <h3 id="delete-product-modal-title" style={{ margin: "0 0 10px", fontSize: 22, color: "var(--navy)" }}>
                      Delete Product
                    </h3>
                    <p style={{ margin: "0 0 16px", color: "var(--text-mid)", lineHeight: 1.6 }}>
                      Are you sure you want to delete <strong>{selectedProduct.name}</strong>? This action cannot be
                      undone.
                    </p>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                      <button type="button" className="elemen-btn-outline" onClick={closeProductModal}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="elemen-btn-primary"
                        style={{ background: "var(--wine-berry)" }}
                        onClick={() => void onDeleteProduct(selectedProduct.id)}
                      >
                        Confirm Delete
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
      </section>
    </main>
  );
}
