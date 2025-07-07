import React from 'react'
import { Form } from 'react-bootstrap'
import { Search } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  disabled,
  placeholder,
}) => (
  <div className="position-relative mb-4">
    <Form.Control
      type="text"
      placeholder={placeholder || 'Buscar...'}
      value={value}
      onChange={onChange}
      className="ps-5"
      size="lg"
      disabled={disabled}
    />
    <Search
      className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
      size={20}
    />
  </div>
)

export default SearchBar
