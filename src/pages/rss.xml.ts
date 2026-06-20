import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: any) {
  const blog = await getCollection('blog');
  
  // Sort posts by date descending
  const sortedBlog = blog.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return rss({
    title: "Simon Gardier Portfolio & Writing",
    description: "Computer Science graduate studies, software engineering projects, computer science and AI research.",
    site: context.site || 'https://yourdomain.dev',
    items: sortedBlog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>en-us</language>`,
  });
}
