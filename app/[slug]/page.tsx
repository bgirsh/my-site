import { wpQuery } from '@/lib/wordpress';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const data = await wpQuery(
    `
    query GetPage($slug: ID!) {
      page(id: $slug, idType: URI) {
        title
        content
      }
    }
    `,
    { slug }
  );

  if (!data?.page) {
    notFound();
  }

  return (
    <main className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">
        {data.page.title}
      </h1>

      <div
        dangerouslySetInnerHTML={{
          __html: data.page.content,
        }}
      />
    </main>
  );
}