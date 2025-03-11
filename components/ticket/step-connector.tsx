import { cn } from "@/lib/utils"

interface StepConnectorProps {
  active: boolean
}

export default function StepConnector({ active }: StepConnectorProps) {
  return (
    <div className="flex-1 hidden sm:block">
      <div className={cn("h-1 mx-2 transition-colors", active ? "bg-red-700" : "bg-gray-200")}></div>
    </div>
  )
}

