import { styled } from "styled-components";
import useForm from "../hooks/useForm";

const SearchForm = () => {
  const { values, errors, submitting, handleChange, handleSubmit } = useForm();
  return (
    <St.SearchFormWrapper>
      <form onSubmit={handleSubmit}>
        <select name="type" onChange={handleChange} value={values.type}>
          <option value="today">오늘</option>
          <option value="week">주간</option>
        </select>
        <input
          name="area"
          value={values.area}
          onChange={handleChange}
          placeholder="영문 지역명 ex)bucheon"
        />
        <button type="submit" disabled={submitting}>
          검색
        </button>
      </form>
      <p className="error-message">{errors.area}</p>
    </St.SearchFormWrapper>
  );
};

export default SearchForm;

const St = {
  SearchFormWrapper: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    form > * {
      padding: 1rem;
    }

    input {
      width: 15rem;

      margin: 0 1rem;
    }

    .error-message {
      margin-top: 1rem;

      color: ${({ theme }) => theme.colors.Red};
      ${({ theme }) => theme.fonts.R_Content_2};
    }
  `,
};
