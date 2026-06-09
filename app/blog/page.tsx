import Link from 'next/link';
import { wpQuery } from '@/lib/wordpress';

export default async function BlogPage() {
  const data = await wpQuery(`
    query {
      posts(first: 10) {
        nodes {
          title
          slug
          excerpt
          date
        }
      }
    }
  `);

  const posts = data.posts.nodes;

  return (
    <main className="p-10">
      <h1>Blog</h1>

      {posts.map((post: any) => (
        <article key={post.slug} className="mb-[30px]">
          <h2>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />

          <Link href={`/blog/${post.slug}`}>
            Read more
          </Link>
        </article>
      ))}
    </main>
  );
}