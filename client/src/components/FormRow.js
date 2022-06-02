const FormRow = ({type, name, value, handleChange, labelText, onBlur, disabledInput}) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
          {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        className='form-input'
        onBlur={onBlur}
        disabled={disabledInput}
      />
    </div>
  )
}
export default FormRow
