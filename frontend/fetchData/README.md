# Fetch Data Utilities

Kumpulan utilities untuk fetch data dari backend API dengan mudah.

## Penggunaan

### 1. Menggunakan Hooks (Recommended)

#### `useLandingPage()`
Fetch data landing page:
```tsx
'use client'

import { useLandingPage } from '@/fetchData/useLandingPage'

export function HeroComponent() {
  const { data, loading, error } = useLandingPage()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.subtitle}</p>
      <img src={data?.heroImage} alt="hero" />
    </div>
  )
}
```

#### `useProjects()`
Fetch semua projects:
```tsx
'use client'

import { useProjects } from '@/fetchData/useProjects'

export function ProjectsComponent() {
  const { data, loading, error } = useProjects()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      {data.map(project => (
        <div key={project.id}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <img src={project.image} alt={project.title} />
          <p>Tech: {project.technologies}</p>
        </div>
      ))}
    </div>
  )
}
```

#### `useAbout()`
Fetch data tentang:
```tsx
'use client'

import { useAbout } from '@/fetchData/useAbout'

export function AboutComponent() {
  const { data, loading, error } = useAbout()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <img src={data?.avatar} alt="avatar" />
      <p>{data?.bio}</p>
      <ul>
        {data?.skills.map(skill => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}
```

#### `useContact()`
Fetch contact information:
```tsx
'use client'

import { useContact } from '@/fetchData/useContact'

export function ContactComponent() {
  const { data, loading, error } = useContact()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <a href={`mailto:${data?.email}`}>{data?.email}</a>
      <a href={data?.github}>{data?.github}</a>
      <a href={data?.linkedin}>{data?.linkedin}</a>
      <a href={data?.twitter}>{data?.twitter}</a>
    </div>
  )
}
```

#### `usePortfolioData()`
Fetch semua data sekaligus:
```tsx
'use client'

import { usePortfolioData } from '@/fetchData/usePortfolioData'

export function PortfolioComponent() {
  const { data, loading, error } = usePortfolioData()

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>{data?.landingPage.title}</h1>
      <p>{data?.landingPage.subtitle}</p>
      
      <section>
        {data?.projects.map(project => (
          <div key={project.id}>{project.title}</div>
        ))}
      </section>
      
      <section>
        <h2>{data?.about.bio}</h2>
      </section>
      
      <section>
        <p>Email: {data?.contact.email}</p>
      </section>
    </div>
  )
}
```

### 2. Menggunakan Direct Functions

Jika tidak ingin menggunakan hooks, bisa langsung call functions dari `@/lib/api`:

```tsx
import { getProjects, getLandingPage, getAbout, getContact } from '@/lib/api'

// Dalam async function atau component
const projects = await getProjects()
const landingPage = await getLandingPage()
const about = await getAbout()
const contact = await getContact()
```

## Backend API Endpoints

Hook-hook ini expect backend memiliki endpoints berikut:

- `GET /api/landing-page` - Landing page data
- `GET /api/projects` - Semua projects
- `GET /api/about` - About data
- `GET /api/contact` - Contact data

## Error Handling

Semua hooks mengembalikan objek dengan:
- `data` - Data yang di-fetch (atau default value jika error)
- `loading` - Boolean untuk loading state
- `error` - String pesan error (atau null jika sukses)

## Environment Variables

Pastikan `NEXT_PUBLIC_API_URL` diset di `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Jika tidak diset, akan default ke `http://localhost:5000`.
