import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetailActions from "@/components/ProductDetailActions";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getProductById } from "@/lib/server/catalog-store";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(decodeURIComponent(id));
  if (!product) return { title: "Product | Elemen India" };
  return {
    title: `${product.name} | Elemen India`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(decodeURIComponent(id));
  if (!product) notFound();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  return (
    <main style={{ background: "var(--bg-cream)", minHeight: "60vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 80px" }}>
        <nav aria-label="Breadcrumb" style={{ marginBottom: 28, fontSize: 13 }}>
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label}>
              {i > 0 ? (
                <span style={{ color: "var(--text-light)", margin: "0 8px" }}>
                  /
                </span>
              ) : null}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  style={{ color: "var(--wine-berry)", textDecoration: "none", fontWeight: 500 }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span style={{ color: "var(--text-mid)" }}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 40, alignItems: "start" }}
        >
          <ScrollReveal variant="fade-right">
            <div
              style={{
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid var(--border)",
                background: "#fff",
                boxShadow: "0 8px 30px rgba(26,39,68,0.08)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                style={{ width: "100%", aspectRatio: "1", objectFit: "cover" }}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={0.08}>
            <ProductDetailActions product={product} />
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
