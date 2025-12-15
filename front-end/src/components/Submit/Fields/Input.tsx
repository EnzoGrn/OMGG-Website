import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { FaUpload } from "react-icons/fa6";
import { useTranslations } from "next-intl";

export const InputField = ({ id, label, subLabel, required = false, value, onChange, errorsMessage, placeholder }: { id: string, label: string, subLabel?: string, required?: boolean, value?: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, errorsMessage?: string, placeholder?: string }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && "*"}</Label>
      {subLabel && <p className="select-none text-sm text-muted-foreground">
        {subLabel}
      </p>}
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={errorsMessage ? "border-destructive" : ""}
      />
      {errorsMessage && <p className="text-sm text-destructive">{errorsMessage}</p>}
    </div>
  );
}

export const TextAreaField = ({ id, label, subLabel, required = false, value, onChange, errorsMessage, placeholder, className, rows = 3, maxLength }: { id: string, label: string, subLabel?: string, required?: boolean, value?: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, errorsMessage?: string, placeholder?: string, className?: string, rows?: number, maxLength?: number }) => {
  const t = useTranslations('SubmitGames.form.fileUpload');

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && "*"}</Label>
      {subLabel && <p className="select-none text-sm text-muted-foreground">
        {subLabel}
      </p>}
      <Textarea
        id={id}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
        className={cn("min-h-28", className, errorsMessage ? "border-destructive" : "")}
      />
      <div className="flex justify-between">
        <p className="text-sm text-destructive">
          {errorsMessage && errorsMessage}
        </p>

        <p className="text-sm text-muted-foreground">
          {maxLength && value?.length + "/" + maxLength + " " + t('characters')}
        </p>
      </div>
    </div>
  );
}

export const FileInputField = ({ id, label, required = false, subLabel, errorMessage, acceptText, accepts, multiple = false, onChange, onDrop, children }: { id: string, label: string, required?: boolean, subLabel?: string, errorMessage?: string, acceptText: string, accepts: string[], multiple?: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onDrop: (e: React.DragEvent<HTMLDivElement>) => void, children?: React.ReactNode }) => {
  const t = useTranslations('SubmitGames.form.fileUpload');

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && "*"}</Label>
      {subLabel && <p className="select-none text-sm text-muted-foreground">
        {subLabel}
      </p>}
      <div className={
        cn(
          "p-4 border border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors",
          errorMessage ? "border-destructive" : "border-muted-foreground hover:bg-muted/30"
        )}
        onClick={() => document.getElementById(id)?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <FaUpload className="text-muted-foreground size-12 m-2" />
        <p className="text-sm text-foreground font-semibold text-center">
          <span className="text-primary">{t('clickToBrowse')}</span> {t('dragAndDrop')}
        </p>
        <p className="text-sm text-muted-foreground">
          {acceptText}
        </p>
        <Input
          id={id}
          type="file"
          accept={accepts.join(",")}
          onChange={onChange}
          multiple={multiple}
          className="hidden"
        />
      </div>
      {children}
    </div>
  );
}

export const SelectField = ({ id, label, required = false, errorMessage, value, onChange, placeholder, items }: { id: string, label: string, required?: boolean, errorMessage?: string, value?: string, onChange: (value: string) => void, placeholder?: string, items: { value: string, label: string }[] }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && "*"}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={errorMessage ? "border-destructive" : ""}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {errorMessage && <p className="text-sm text-destructive">{errorMessage}</p>}
    </div>
  );
}
