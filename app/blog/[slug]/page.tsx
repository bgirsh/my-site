import { wpQuery } from '@/lib/wordpress';

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await wpQuery(
    `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        title
        content
        date
      }
    }
    `,
    { slug }
  );

  const post = data.post;

  return (
    <main className="p-10">
      <article>
        <h1>{post.title}</h1>

        <p>
          {new Date(post.date).toLocaleDateString()}
        </p>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </main>
  );
}