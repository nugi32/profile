import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: ({
    // keep local/email auth enabled while adding OAuth providers
    tokenExpiration: 60 * 60 * 24 * 30,
    providers: {
      github: {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
        scope: ['user:email'],
        callbackURL:
          process.env.GITHUB_CALLBACK_URL,
      },
    },
  } as unknown) as any,
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}
