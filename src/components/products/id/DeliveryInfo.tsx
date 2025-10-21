import { Truck, RotateCcw, Percent } from "lucide-react";
import { useGlobalStore } from "@/store/useGlobalStore";

export default function DeliveryInfo() {
  const {contacts, settings} = useGlobalStore()
  return (
    <div className="flex flex-col items-start gap-3 mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="p-4 flex items-start gap-4 text-green-600">
        <Truck className="w-6 h-6 flex-shrink-0" />
        <div>
          <div className="font-semibold mb-1">Delivery Info</div>
          <div className="text-sm text-gray-600">
            {settings?.shippingInfo}
          </div>
        </div>
      </div>
      <div className="p-4 flex items-start gap-4 text-green-600">
        <Percent className="w-6 h-6 flex-shrink-0" />
        <div>
          <div className="font-semibold mb-1">Tax Info</div>
          <div className="text-sm text-gray-600">
            {settings?.taxInfo}
          </div>
        </div>
      </div>
    </div>
  );
}