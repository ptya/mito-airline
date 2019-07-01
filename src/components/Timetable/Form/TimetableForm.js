import React, { useContext } from "react";

// components
import CustomDatePicker from "components/CustomDatePicker";

// context
import { StationsContext } from "components/providers/StationsProvider";

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

  const onSubmit = event => {
    event.preventDefault();
    if (secondaryReturnDate) {
      stationsDispatch({ type: "setReturn", returnDate: secondaryReturnDate });
    }
  };

  return (
    <Form autoComplete="off" onSubmit={onSubmit}>
      <fieldset>
        <InputField>
          <CustomDatePicker placeholder="Return" type="secondaryReturn" />
          <CalendarIco />
        </InputField>
        <SearchButton type="submit">Search</SearchButton>
      </fieldset>
    </Form>
  );
};

export default TimetableForm;
