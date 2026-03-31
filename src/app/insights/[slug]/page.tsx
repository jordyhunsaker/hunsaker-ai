import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Hunsaker.ai",
    };
  }

  return {
    title: `${post.title} | Hunsaker.ai`,
    description: post.description,
  };
}

// Simple markdown to HTML converter for basic formatting
function parseMarkdown(content: string): string {
  return content
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-gray-100 mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-gray-100 mt-10 mb-4">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-gray-100 mt-10 mb-4">$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-gray-100">$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Code blocks
    .replace(/```([\s\S]*?)```/g, '<pre class="bg-dark-700 rounded-lg p-4 overflow-x-auto my-4 font-mono text-sm"><code>$1</code></pre>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-dark-700 px-1.5 py-0.5 rounded text-terminal-cyan font-mono text-sm">$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-terminal-green hover:underline">$1</a>')
    // Unordered lists
    .replace(/^\s*[-*]\s+(.*)$/gim, '<li class="ml-4 text-gray-300">$1</li>')
    // Wrap consecutive list items
    .replace(/(<li.*<\/li>\n?)+/g, '<ul class="list-disc list-inside space-y-2 my-4">$&</ul>')
    // Paragraphs (lines that aren't headers, lists, or empty)
    .replace(/^(?!<[hul]|$)(.+)$/gim, '<p class="text-gray-300 leading-relaxed mb-4">$1</p>')
    // Clean up extra paragraph tags around block elements
    .replace(/<p class="text-gray-300 leading-relaxed mb-4">(<[hul])/g, '$1')
    .replace(/(<\/[hul][^>]*>)<\/p>/g, '$1');
}

export default async function InsightPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = parseMarkdown(post.content);

  return (
    <main className="min-h-screen bg-dark-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="font-mono text-xl font-bold text-terminal-green glow-green">
            hunsaker.ai
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#services" className="text-gray-400 hover:text-terminal-green transition-colors">
              Services
            </Link>
            <Link href="/case-studies" className="text-gray-400 hover:text-terminal-green transition-colors">
              Case Studies
            </Link>
            <Link href="/assessment" className="text-gray-400 hover:text-terminal-green transition-colors">
              Assessment
            </Link>
            <Link href="/insights" className="text-terminal-green">
              Insights
            </Link>
            <Link
              href="/book"
              className="px-4 py-2 bg-terminal-green text-dark-900 font-semibold rounded hover:bg-terminal-green/90 transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-terminal-green transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Insights
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <time className="text-sm text-gray-500 font-mono">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-gray-600">|</span>
              <span className="text-sm text-gray-500">{post.readingTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-100 mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-gray-400">{post.description}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-dark-700 text-terminal-cyan text-sm rounded-full font-mono"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* CTA */}
          <div className="mt-16 gradient-border rounded-lg bg-dark-800 p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Implement?</h3>
            <p className="text-gray-400 mb-6">
              Let's discuss how these insights apply to your specific situation.
            </p>
            <Link
              href="/book"
              className="inline-block px-8 py-4 bg-terminal-green text-dark-900 font-bold rounded-lg hover:bg-terminal-green/90 transition-colors"
            >
              Book a Strategy Call
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-700">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="font-mono text-terminal-green">hunsaker.ai</Link>
          <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Jordy Hunsaker. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
