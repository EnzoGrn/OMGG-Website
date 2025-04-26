import { Label } from '@/components/ui/label'

const RequiredLabel = ({ label } : { label: string }) => {
  return (
    <Label>{label} *</Label>
  );
}

export { RequiredLabel }
