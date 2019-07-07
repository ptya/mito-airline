import React, {
  useContext,
  useCallback,
  useState,
  useLayoutEffect
} from "react";

// components
import CustomDatePicker from "components/CustomDatePicker";

// context
import { StationsContext } from "components/providers/StationsProvider";

// foreign elements
import Error from "components/Home/elements/Error";

// global styles
import CalendarIco from "components/styles/CalendarIco";
import InputField from "components/styles/InputField";

// local styles
import Form from "./styles/Form";
import SearchButton from "./styles/SearchButton";

const TimetableForm = () => {
  const {
    stationsDispatch,
    stations: { secondaryReturnDate }
  } = useContext(StationsContext);

  const [error, setError] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback(() => {
    const e = {};
    if (!secondaryReturnDate) e.secondaryReturnDate = "Please select departure";
    setError(e);
    return e.secondaryReturnDate ? true : false;
  }, [secondaryReturnDate]);

  const onSubmit = event => {
    event.preventDefault();
    const err = validate();
    if (!isSubmitted) setIsSubmitted(true);

    if (!err) {
      stationsDispatch({ type: "setReturn", returnDate: secondaryReturnDate });
    }
  };

  useLayoutEffect(() => {
    // skip validation until first submit
    if (!isSubmitted) {
      return;
    }
    validate();
  }, [secondaryReturnDate, isSubmitted, validate]);

  return (
    <Form autoComplete="off" onSubmit={onSubmit}>
      <fieldset>
        <InputField isError={error && error.secondaryReturnDate}>
          <CustomDatePicker placeholder="Return" type="secondaryReturn" />
          <CalendarIco />
          {error && error.secondaryReturnDate && (
            <Error message={error.secondaryReturnDate} />
          )}
        </InputField>
        <SearchButton type="submit">Search</SearchButton>
      </fieldset>
    </Form>
  );
};

export default TimetableForm;
