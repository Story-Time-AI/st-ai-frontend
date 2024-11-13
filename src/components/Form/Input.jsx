import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      placeholder = '',
      error = '',
      icon = null,
      disabled = false,
      required = false,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <label className={`form-control ${fullWidth ? 'w-full' : 'max-w-xs'}`}>
        {label && (
          <div className="label">
            <span className="label-text font-semibold text-gray-400">{label}</span>
            {required && <span className="label-text-alt text-red-500 ml-1">*</span>}
          </div>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              {icon}
            </span>
          )}
          <input
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            ref={ref} // Forward the ref here
            className={`input input-bordered w-full ${icon ? 'pl-10' : ''} ${
              error ? 'input-error' : ''
            } ${disabled ? 'input-disabled' : ''}`}
            aria-invalid={!!error}
            aria-describedby={error ? `${label}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p id={`${label}-error`} className="mt-1 text-sm text-red-500">
            {error}
          </p>
        )}
      </label>
    );
  }
);

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

Input.displayName = 'Input';

export default Input;
