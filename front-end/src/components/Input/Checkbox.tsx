import { Checkbox } from "@/components/ui/checkbox";
import { Label    } from "@/components/ui/label";

const CheckboxLabel = ({ id, checked, onChanged, label } : { id: string, checked: boolean, onChanged: (checked: boolean) => void, label?: string }) => {
  return (
    <div className="flex w-full gap-2">
      <Checkbox id={id} checked={checked} onCheckedChange={(state: boolean) => onChanged(state)} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}

export { CheckboxLabel };
