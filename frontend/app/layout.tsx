import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer"
import { getCompanyLogo } from "@/fetchData/CompanyLogo";
import { getFooterData } from "@/fetchData/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

const logo = await getCompanyLogo();
const footer = await getFooterData();

  return (
<html lang="en" suppressHydrationWarning>
  <body className="min-h-screen flex flex-col">
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
 

      <main className="flex-1">
        {children}
      </main>

{footer ? (
  <Footer
  />
) : null}
    </ThemeProvider>
  </body>
</html>
  )
}

