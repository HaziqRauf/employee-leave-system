const FormRow = ({type, name, value, handleChange, labelText, max, min, refer, disabledInput}) => {
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
        ref={refer}
        disabled={disabledInput}
        max={max}
        min={min}
      />
    </div>
  )
}
export default FormRow
