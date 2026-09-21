import './SearchBox.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      className="search-box"
      type="text"
      placeholder="搜尋商品..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="搜尋商品"
    />
  );
}
