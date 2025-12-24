"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SearchIcon, CalendarIcon, X } from "lucide-react"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { fr, enUS } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface BlogFiltersProps {
  categories: string[];
  filters: { search: string; category: string; startDate: Date | undefined; endDate: Date | undefined };
  onFilter: (filters: { search: string; category: string; startDate: Date | undefined; endDate: Date | undefined }) => void;
  translations: {
    searchPlaceholder: string;
    allCategories: string;
    searchButton: string;
    dateFilter: {
      title: string;
      startDate: string;
      endDate: string;
      filterButton: string;
      cancel: string;
    };
  };
  locale?: string;
}

const BlogFilters = ({ categories, filters, onFilter, translations, locale = "fr" }: BlogFiltersProps) => {
  const [search, setSearch] = useState(filters.search);
  const [category, setCategory] = useState<string>(filters.category);
  const [startDate, setStartDate] = useState<Date | undefined>(filters.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(filters.endDate);
  const [isDateDialogOpen, setIsDateDialogOpen] = useState(false);

  const dateLocale = locale === "fr" ? fr : enUS;

  // Sync local state with props when filters change from parent (e.g. reset)
  useEffect(() => {
    setSearch(filters.search);
    setCategory(filters.category);
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
  }, [filters]);

  const handleSearch = () => {
    onFilter({
      search,
      category: category || "",
      startDate,
      endDate
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleApplyDateFilter = () => {
    setIsDateDialogOpen(false);
    handleSearch();
  };

  const handleRemoveSearch = () => {
    setSearch("");
    onFilter({ search: "", category: category, startDate, endDate });
  };

  const handleRemoveCategory = () => {
    setCategory("");
    onFilter({ search, category: "", startDate, endDate });
  };

  const handleRemoveDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    onFilter({ search, category, startDate: undefined, endDate: undefined });
  };

  const hasActiveFilters = filters.search !== "" || filters.category !== "" || filters.startDate !== undefined || filters.endDate !== undefined;

  return (
    <div className="w-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto_auto] gap-3">

        <div className="relative">
          <SearchIcon className="absolute left-3 size-4 translate-y-2/3 text-muted-foreground" />
          <Input
            type="text"
            placeholder={translations.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyPress}
            className="pl-9"
          />
        </div>

        <Select value={category} onValueChange={(value) => setCategory(value === "all" ? "" : value)}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder={translations.allCategories} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{translations.allCategories}</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Dialog open={isDateDialogOpen} onOpenChange={setIsDateDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full md:w-auto gap-2">
              <CalendarIcon className="h-4 w-4" />
              <span className="hidden sm:inline">
                {startDate || endDate
                  ? `${startDate ? format(startDate, "dd/MM/yyyy", { locale: dateLocale }) : "..."} - ${endDate ? format(endDate, "dd/MM/yyyy", { locale: dateLocale }) : "..."}`
                  : translations.dateFilter.title
                }
              </span>
              <span className="sm:hidden">{translations.dateFilter.title}</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[90vw] sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{translations.dateFilter.title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>{translations.dateFilter.startDate}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: dateLocale }) : "JJ/MM/AAAA"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      locale={dateLocale}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>{translations.dateFilter.endDate}</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: dateLocale }) : "JJ/MM/AAAA"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      locale={dateLocale}
                      initialFocus
                      disabled={(date: Date) => startDate ? date < startDate : false}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDateDialogOpen(false)}
              >
                {translations.dateFilter.cancel}
              </Button>
              <Button onClick={handleApplyDateFilter}>
                {translations.dateFilter.filterButton}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button onClick={handleSearch} className="w-full md:w-auto uppercase font-semibold">
          {translations.searchButton}
        </Button>
      </div>

      {/* Active Filters Row */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {filters.search && (
            <Badge variant="secondary" className="gap-2 pl-3 pr-2 py-1.5">
              <SearchIcon className="h-3 w-3" />
              <span>{filters.search}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={handleRemoveSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {filters.category && (
            <Badge variant="secondary" className="gap-2 pl-3 pr-2 py-1.5">
              <span>{filters.category}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={handleRemoveCategory}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {(filters.startDate || filters.endDate) && (
            <Badge variant="secondary" className="gap-2 pl-3 pr-2 py-1.5">
              <CalendarIcon className="h-3 w-3" />
              <span>
                {filters.startDate ? format(filters.startDate, "dd/MM/yyyy", { locale: dateLocale }) : "..."}
                {" - "}
                {filters.endDate ? format(filters.endDate, "dd/MM/yyyy", { locale: dateLocale }) : "..."}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={handleRemoveDateFilter}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}

export { BlogFilters }
