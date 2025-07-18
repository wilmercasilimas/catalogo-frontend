// src/components/ui/EstadoSelect.tsx
import * as Select from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function EstadoSelect({ value, onChange, options }: Props) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger className="w-full border rounded px-3 py-2 text-sm flex justify-between items-center bg-white">
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="z-50 bg-white rounded shadow-md overflow-hidden">
          <Select.Viewport className="p-1">
            {options.map((opt) => (
              <Select.Item
                key={opt}
                value={opt}
                className="px-3 py-2 text-sm hover:bg-gray-100 rounded flex items-center gap-2 cursor-pointer"
              >
                <Select.ItemText>{opt}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check className="h-4 w-4 ml-auto text-green-600" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
