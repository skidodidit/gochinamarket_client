import Link from "next/link";

interface ProductBreadcrumbProps {
  productName: string;
}

export default function ProductBreadcrumb({ productName }: ProductBreadcrumbProps) {
  return (
    <div className="text-sm text-gray-400 mb-8">
      <Link href="/" className="hover:text-gray-500">Home</Link>
      <span className="mx-2">/</span>
      <Link href="/products" className="hover:text-gray-500">Products</Link>
      <span className="mx-2">/</span>
      <span className="text-primary-300">{productName}</span>
    </div>
  );
}