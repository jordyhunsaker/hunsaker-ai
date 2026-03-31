import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata = {
  title: "Insights | Hunsaker.ai",
  description: "Articles on AI strategy, implementation, and best practices for businesses.",
};

export default function InsightsPage() {
  const posts = getAllPosts();

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

      {/* Header */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-terminal-cyan mb-4">// Thoughts & Ideas</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Insights</h1>
          <p className="text-xl text-gray-400 max-w-2xl">
            Practical articles on AI strategy, implementation, and best practices for businesses.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p>No posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/insights/${post.slug}`}
                  className="gradient-border rounded-lg bg-dark-800 overflow-hidden hover:bg-dark-700 transition-colors group"
                >
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <time className="text-sm text-gray-500 font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      <span className="text-gray-600">|</span>
                      <span className="text-sm text-gray-500">{post.readingTime}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-100 mb-3 group-hover:text-terminal-green transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-dark-700 text-terminal-cyan text-xs rounded font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-dark-800">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-400 mb-6">
            Get AI insights and practical tips delivered to your inbox. No spam, unsubscribe anytime.
          </p>
          <form className="flex gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-200 placeholder-gray-500 focus:border-terminal-green focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-terminal-green text-dark-900 font-semibold rounded-lg hover:bg-terminal-green/90 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

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
