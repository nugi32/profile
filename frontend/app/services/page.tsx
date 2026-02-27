export const revalidate = 60;
import ProductsServicesSection from '@/components/ProductsServicesSection';
import { getProductServicesData } from '@/fetchData/ProductServices';

export default async function ServicesPage() {
  const ProductServicesData = await getProductServicesData();

  return (
    <div style={{ backgroundColor: 'var(--background)' }}>
      {ProductServicesData ? (
        <ProductsServicesSection 
          contentShort={ProductServicesData.contentShort}
          contentFull={ProductServicesData.contentFull}
        />
      ) : (
        <p className="text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center m-10">
          Product Services data is not available
        </p>
      )}
    </div>
  );
}
