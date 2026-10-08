import { redirect } from 'next/navigation';
import { getEVProductBySlug } from '@/data/products/ev-parts';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductRedirectPage({ params }: Props) {
  const { slug } = await params;
  const product = getEVProductBySlug(slug);

  const vehicleType =
    product?.vehicleCompatibility?.includes('3-wheeler') &&
    !product?.vehicleCompatibility?.includes('2-wheeler')
      ? '3-wheeler'
      : '2-wheeler';

  redirect(`/ev-parts/${vehicleType}/${slug}`);
}
