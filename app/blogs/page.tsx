import PageHero from "@/components/PageHero";
import BlogPostCard from "@/components/BlogPostCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { pageImages } from "@/lib/content/images";
import { listPublishedBlogs } from "@/lib/server/blogs-store";

export const metadata = {
  title: "Blog | Elemen India",
  description: "Security and IT articles, guides, and insights from Elemen India.",
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const posts = await listPublishedBlogs();

  return (
    <main>
      <PageHero
        title="Security & IT Articles"
        subtitle="Guides, tips, and insights on CCTV, access control, networking, and IT infrastructure."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        imageSrc={pageImages.ourServices}
        imageAlt="Security and IT blog articles"
      />
      <section style={{ maxWidth: 1300, margin: "0 auto", padding: "48px 20px 80px" }}>
        {posts.length === 0 ? (
          <ScrollReveal variant="fade-up">
            <p style={{ color: "var(--text-mid)", fontSize: 16, lineHeight: 1.8 }}>
              No articles published yet. Check back soon for security and IT insights.
            </p>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
            {posts.map((post, i) => (
              <BlogPostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
