import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 w-[60%] m-2">
      <Skeleton className="h-96 w-full rounded-xl" />
      
    </div>
  )
}
