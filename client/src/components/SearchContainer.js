import { FormRow, FormRowSelect } from '.'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    leaveOptions,
    sessionOptions,
  } = useAppContext()
  const handleSearch = (e) => {
    if(isLoading) return
    handleChange({ name:e.target.name, value: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    clearFilters()
  }
  return (
    <Wrapper>
      <form className='form'>
        <h4>Search form</h4>
        <div className='form-center'>
          <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          />
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all',...leaveOptions]}
          />
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all',...sessionOptions]}
          />
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}
export default SearchContainer
