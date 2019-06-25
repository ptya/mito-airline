import React, { useContext } from "react";

// context
import { StationsContext } from "components/StationsProvider";

// components
import CustomDatePicker from "components/CustomDatePicker";

// global elements
import CalendarIco from "components/elements/CalendarIco";
import InputField from "components/elements/InputField";
import ArticleWrapper from "components/elements/ArticleWrapper";

// parent elements
import Header from "../Header/elements/Header";

// local elements
import AnimatedWrapper from "../Select/elements/AnimatedWrapper";
import Form from "../Select/elements/Form";
import SearchButton from "../Select/elements/SearchButton";

// assets
import mediumArrow from "assets/images/arrow-medium.svg";

const TimetableForm = props => {
  const {
    origin,
    destination,
    secondaryReturnDate,
    setReturnDate
  } = useContext(StationsContext);

  const onSubmit = event => {
    event.preventDefault();
    if (secondaryReturnDate) {
      setReturnDate(secondaryReturnDate);
    }
  };

  return (
    <ArticleWrapper>
      <Header>
        <h2>Inbound</h2>
        <p>
          {destination.shortName}
          <img src={mediumArrow} alt="to" />
          {origin.shortName}
        </p>
      </Header>
      <Form autoComplete="off" onSubmit={onSubmit}>
        <fieldset>
          <InputField>
            <CustomDatePicker placeholder="Return" type="secondaryReturn" />
            <CalendarIco />
          </InputField>
          <SearchButton type="submit">Search</SearchButton>
        </fieldset>
      </Form>
    </ArticleWrapper>
  );
};

export default TimetableForm;
