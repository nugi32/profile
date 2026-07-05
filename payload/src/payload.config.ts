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
  Skills,
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

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://nugiprofile.netlify.app',
    'https://nugi-profile.vercel.app',
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
    Skills,
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
    connectOptions: {
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    },
  }),
  sharp,

  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: {
          prefix: 'media',
        },
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})