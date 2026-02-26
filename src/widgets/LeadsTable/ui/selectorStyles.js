export const tableSelectStyles = {
  control: (provided, state) => ({
  ...provided,
  minHeight: 28,
  height: 28,
  backgroundColor: 'var(--color-surface)',
  borderColor: state.isFocused
    ? 'var(--color-accent)'
    : 'var(--color-border)',
  boxShadow: state.isFocused
    ? '0 0 0 1px var(--color-accent)'
    : 'none',
  '&:hover': {
    borderColor: 'var(--color-accent)',
  },
}),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0 8px',
    height: 28,
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    color: 'var(--color-text)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--color-text)',
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: 28,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: 4,
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--color-surface)',
    zIndex: 99999, 
    minWidth: '100%',     
    width: 250,
  }),
menuList: (provided) => ({
  ...provided,
  maxHeight: 350,
  overflowY: 'auto',

  // Firefox
  scrollbarWidth: 'thin',
  scrollbarColor: 'var(--color-border) transparent',

  // Chrome / Edge / Safari
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'var(--color-border)',
    borderRadius: '10px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: 'var(--color-muted)',
  },
}),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? 'var(--color-accent)'
      : state.isFocused
      ? 'var(--color-muted)'
      : 'var(--color-surface)',
    color: 'var(--color-text)',
    cursor: 'pointer',
  }),
};