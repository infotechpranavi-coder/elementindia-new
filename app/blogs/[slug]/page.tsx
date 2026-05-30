import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { formatBlogDate, formatReadTime } from "@/lib/format-blog";
import { getBlogBySlug } from "@/lib/server/blogs-store";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug, true);
  if (!post) return { title: "Article | Elemen India" };
  return {
    title: `${post.title} | Elemen India`,
    description: post.excerpt,
  };
}

function renderContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block, i) => (
      <p
        key={i}
        style={{
          fontSize: 16,
          color: "var(--text-mid)",
          lineHeight: 1.9,
          margin: "0 0 16px",
        }}
      >
        {block}
      </p>
    ));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug, true);
  if (!post) notFound();

  return (
    <main>
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blogs" },
          { label: post.title },
        ]}
        imageSrc={post.imageUrl}
        imageAlt={post.title}
      />
      <article style={{ maxWidth: 860, margin: "0 auto", padding: "48px 20px 80px" }}>
        <ScrollReveal variant="fade-up">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              alignItems: "center",
              marginBottom: 28,
              fontSize: 13,
              color: "var(--text-mid)",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "#fff",
                background: "var(--wine-berry)",
                padding: "4px 10px",
                borderRadius: 3,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              {post.category}
            </span>
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>·</span>
            <span>{formatReadTime(post.readTimeMinutes)}</span>
          </div>
          <div style={{ display: "grid", gap: 16 }}>{renderContent(post.content)}</div>
          <Link
            href="/blogs"
            style={{
              display: "inline-block",
              marginTop: 32,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--wine-berry)",
              textDecoration: "none",
              borderBottom: "1px solid var(--wine-berry)",
            }}
          >
            ← Back to all articles
          </Link>
        </ScrollReveal>
      </article>
    </main>
  );
}
