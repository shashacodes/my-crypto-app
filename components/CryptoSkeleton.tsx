import { Skeleton } from "@/components/ui/skeleton";

export default function CryptoSkeleton() {
  return (
    <div className="p-4 border rounded-lg shadow backdrop-blur-sm bg-gray-200/30 dark:bg-gray-800/20">
      <Skeleton className="w-14 h-14 mx-auto rounded-full mb-4" />
      <Skeleton className="h-4 w-2/3 mx-auto mb-2" />
      <Skeleton className="h-3 w-1/2 mx-auto" />
    </div>
  );
}
