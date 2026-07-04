import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {
  JournalEntries,
  Projects,
  KnowledgeNodes,
  KnowledgeEdges,
  CurrentFocus,
  LearningItems,
  Books,
  Papers,
  SocialLinks,
  Metrics,
  MonthlyDeepWork,
  QuarterlyReading,
  Timeline,
  WeirdThoughts,
} from './collections/Content'
import { Profile } from './collections/Profile'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: [
    'http://localhost:3000',   // your Next.js frontend
    'http://localhost:3001',   // your CMS itself
    'nugiprofile.netlify.app',
    'https://nugi-profile.vercel.app/',
  ],
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Profile,
    JournalEntries,
    Projects,
    KnowledgeNodes,
    KnowledgeEdges,
    CurrentFocus,
    LearningItems,
    Books,
    Papers,
    SocialLinks,
    Metrics,
    MonthlyDeepWork,
    QuarterlyReading,
    Timeline,
    WeirdThoughts,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],
})
