import * as Select from "@radix-ui/react-select";
import React from "react";

const SelectField = ({ value, label, isRequired, options = [], onChange }) => {
  const selectedOption = options.find(option => option.value === value);

  return (
    <div className="w-72 max-w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="w-full inline-flex items-center justify-between px-3 py-2 text-sm text-gray-600 bg-white border rounded-lg shadow-sm outline-none focus:ring-offset-2 focus:ring-indigo-600 focus:ring-2">
          <Select.Value placeholder="Pilih opsi">
            <div className="flex items-center gap-2">
              {selectedOption?.img && <img src={selectedOption.img} className="w-5 h-5 rounded-full" alt="Avatar" />}
              <span>{selectedOption ? selectedOption.label : "Pilih opsi"}</span>
            </div>
          </Select.Value>
          <Select.Icon className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content position="popper" avoidCollisions={false} className="w-[var(--radix-select-trigger-width)] max-h-64 mt-3 overflow-y-auto bg-white border rounded-lg shadow-sm text-sm">
            <Select.Viewport>
              {options.map((option, index) => (
                <SelectItem key={option.value || index} value={option.value} img={option.img}>
                  {option.label}
                </SelectItem>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

const SelectItem = React.forwardRef(({ children, value, img, ...props }, ref) => {
  return (
    <Select.Item className="flex items-center justify-between px-3 py-2 cursor-pointer text-gray-600 hover:bg-indigo-50 outline-none" value={value} ref={ref} {...props}>
      <Select.ItemText>
        <div className="flex items-center gap-2">
          {img && <img src={img} className="w-5 h-5 rounded-full" alt="Avatar" />}
          {children}
        </div>
      </Select.ItemText>
      <Select.ItemIndicator>
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </Select.ItemIndicator>
    </Select.Item>
  );
});

export default SelectField;
