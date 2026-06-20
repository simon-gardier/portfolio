import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders'; // Import the new modern file system loader

const blog = defineCollection({
  // Use the glob loader to watch and fetch markdown/mdx entries
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // Automatically coerce strings to Date objects safely
    tags: z.array(z.string()),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/publications' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    journal: z.string(),
    year: z.number(),
    doi: z.string().optional(),
    link: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    techStack: z.array(z.string()),
    releaseYear: z.number(),
    github: z.string().url().optional(),
    live: z.string().url().optional(),
    image: z.string().optional(),
  }),
});

export const collections = { blog, publications, projects };
