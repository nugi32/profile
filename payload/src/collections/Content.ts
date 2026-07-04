import type { CollectionConfig } from 'payload'

export const JournalEntries: CollectionConfig = {
  slug: 'journal-entries',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'readingTime',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
    },
  ],
}

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'longDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'technologies',
      type: 'array',
      fields: [
        {
          name: 'technology',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Live', value: 'Live' },
        { label: 'In Development', value: 'In Development' },
        { label: 'Research', value: 'Research' },
        { label: 'Archived', value: 'Archived' },
      ],
    },
    {
      name: 'achievements',
      type: 'array',
      fields: [
        {
          name: 'achievement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'githubUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'demoUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'accent',
      type: 'select',
      required: true,
      options: [
        { label: 'Ice', value: 'ice' },
        { label: 'Amber', value: 'amber' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      required: true,
    },
  ],
}

export const KnowledgeNodes: CollectionConfig = {
  slug: 'knowledge-nodes',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'group',
      type: 'select',
      required: true,
      options: [
        { label: 'Technology', value: 'technology' },
        { label: 'Finance', value: 'finance' },
        { label: 'Foundation', value: 'foundation' },
        { label: 'Abstract', value: 'abstract' },
      ],
    },
    {
      name: 'weight',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
  ],
}

export const KnowledgeEdges: CollectionConfig = {
  slug: 'knowledge-edges',
  admin: {
    useAsTitle: 'strength',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'source',
      type: 'relationship',
      relationTo: 'knowledge-nodes',
      required: true,
    },
    {
      name: 'target',
      type: 'relationship',
      relationTo: 'knowledge-nodes',
      required: true,
    },
    {
      name: 'strength',
      type: 'number',
      required: true,
      min: 0,
      max: 1,
    },
  ],
}

export const CurrentFocus: CollectionConfig = {
  slug: 'current-focus',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
  ],
}

export const LearningItems: CollectionConfig = {
  slug: 'learning-items',
  admin: {
    useAsTitle: 'topic',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'topic',
      type: 'text',
      required: true,
    },
    {
      name: 'progress',
      type: 'number',
      required: true,
      min: 0,
      max: 100,
    },
  ],
}

export const Books: CollectionConfig = {
  slug: 'books',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Reading', value: 'Reading' },
        { label: 'Queued', value: 'Queued' },
        { label: 'Finished', value: 'Finished' },
      ],
    },
  ],
}

export const Papers: CollectionConfig = {
  slug: 'papers',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Reading', value: 'Reading' },
        { label: 'Queued', value: 'Queued' },
        { label: 'Finished', value: 'Finished' },
      ],
    },
  ],
}

export const SocialLinks: CollectionConfig = {
  slug: 'social-links',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'href',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
  ],
}

export const Metrics: CollectionConfig = {
  slug: 'metrics',
  admin: {
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'value',
      type: 'number',
      required: true,
    },
    {
      name: 'suffix',
      type: 'text',
      required: false,
    },
    {
      name: 'icon',
      type: 'text',
      required: true,
    },
  ],
}

export const MonthlyDeepWork: CollectionConfig = {
  slug: 'monthly-deep-work',
  admin: {
    useAsTitle: 'month',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'month',
      type: 'text',
      required: true,
    },
    {
      name: 'hours',
      type: 'number',
      required: true,
      min: 0,
    },
  ],
}

export const QuarterlyReading: CollectionConfig = {
  slug: 'quarterly-reading',
  admin: {
    useAsTitle: 'quarter',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quarter',
      type: 'text',
      required: true,
    },
    {
      name: 'books',
      type: 'number',
      required: true,
      min: 0,
    },
  ],
}

export const Timeline: CollectionConfig = {
  slug: 'timeline',
  admin: {
    useAsTitle: 'year',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'year',
      type: 'text',
      required: true,
    },
    {
      name: 'theme',
      type: 'text',
      required: true,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}

export const WeirdThoughts: CollectionConfig = {
  slug: 'weird-thoughts',
  admin: {
    useAsTitle: 'quote',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
    },
    {
      name: 'context',
      type: 'textarea',
      required: false,
    },
  ],
}
