import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  
  interface FiltersProps {
    onApplyFilters: () => void;
    selectedBrand: string;
    onBrandChange: (value: string) => void;
    priceRange: { min: string; max: string };
    onPriceRangeChange: (range: { min: string; max: string }) => void;
    selectedCondition: string;
    onConditionChange: (value: string) => void;
  }
  
  export const Filters = ({ 
    onApplyFilters,
    selectedBrand,
    onBrandChange,
    priceRange,
    onPriceRangeChange,
    selectedCondition,
    onConditionChange,
  }: FiltersProps) => {
    return (
      <div className="space-y-6 p-4 bg-white rounded-lg shadow-sm">
        <h2 className="font-semibold text-lg mb-4">Фільтри пошуку</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Бренд</label>
            <Select value={selectedBrand} onValueChange={onBrandChange}>
              <SelectTrigger>
                <SelectValue placeholder="Оберіть бренд" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі бренди</SelectItem>
                <SelectItem value="samsung">Samsung</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="xiaomi">Xiaomi</SelectItem>
                <SelectItem value="vivo">Vivo</SelectItem>
                <SelectItem value="huawei">Huawei</SelectItem>
                <SelectItem value="oppo">Oppo</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <div>
            <label className="text-sm font-medium mb-2 block">Ціна</label>
            <div className="flex gap-2">
              <Input 
                type="number" 
                placeholder="Від"
                value={priceRange.min}
                onChange={(e) => onPriceRangeChange({ ...priceRange, min: e.target.value })}
              />
              <Input 
                type="number" 
                placeholder="До"
                value={priceRange.max}
                onChange={(e) => onPriceRangeChange({ ...priceRange, max: e.target.value })}
              />
            </div>
          </div>
  
          <div>
            <label className="text-sm font-medium mb-2 block">Стан</label>
            <Select value={selectedCondition} onValueChange={onConditionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Всі оголошення" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі</SelectItem>
                <SelectItem value="new">Нові</SelectItem>
                <SelectItem value="used">Вживані</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <Button 
            onClick={onApplyFilters}
            className="w-full"
          >
            Показати оголошення
          </Button>
        </div>
      </div>
    );
  };