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

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
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
