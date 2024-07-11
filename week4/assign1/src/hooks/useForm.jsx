import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const useForm = () => {
  const [values, setValues] = useState({ type: "today", area: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // type과 area에 대해 validation 하는 함수
  const validate = ({ type, area }) => {
    const errors = {};

    if (!area) {
      errors.area = "지역 입력 안 할거니?";
    } else if (!/^[a-zA-Z]*$/.test(area)) {
      errors.area = "영문으로 입력해야지?";
    }

    if (!type) {
      errors.type = "오늘이니, 주간이니?";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    setSubmitting(true);
    e.preventDefault();
    setErrors(validate(values));
  };

  useEffect(() => {
    if (submitting) {
      if (Object.keys(errors).length === 0) {
        navigate(`/${values.type}/${values.area}`);
      }
      setSubmitting(false);
    }
  }, [errors]);

  // select box(오늘, 주간)를 바꾸면 자동으로 검색
  useEffect(() => {
    if (values.area !== "") {
      navigate(`/${values.type}/${values.area}`);
    }
  }, [values.type]);

  return {
    values,
    errors,
    submitting,
    handleChange,
    handleSubmit,
  };
};

export default useForm;
