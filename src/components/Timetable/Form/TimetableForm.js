import React, { useContext } from "react";

// components
import CustomDatePicker from "components/CustomDatePicker";

// context
import { StationsContext } from "components/StationsProvider";

// global elements
import CalendarIco from "components/elements/CalendarIco";
import InputField from "components/elements/InputField";

// local elements
import Form from "./elements/Form";
import SearchButton from "./elements/SearchButton";

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
