import { Search } from '@mui/icons-material';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск фильмов...',
}: SearchInputProps) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input pl-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
    </div>
  );
};