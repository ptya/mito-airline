import React, {
  useContext,
  useState,
  useLayoutEffect,
  useCallback
} from "react";

// components
import SelectStation from "../SelectStation";
import CustomDatePicker from "../CustomDatePicker";

// hooks
import { useRouter } from "../hooks/useRouter";

// context
import {
  StationsContext,
  originSession,
  destSession
} from "components/providers/StationsProvider";

// local elements
import Header from "./elements/Header";
import Error from "./elements/Error";

// global styles
import Button from "components/styles/Button";
import CalendarIco from "components/styles/CalendarIco";
import InputField from "components/styles/InputField";

// local styles
import Wrapper from "./styles/Wrapper";
import Form from "./styles/Form";
import Main from "./styles/Main";

const Home = () => {
  const { history } = useRouter();
  const {
    stations: { origin, destination, departureDate }
  } = useContext(StationsContext);
  const [error, setError] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = useCallback(() => {
    const e = {};
    if (!origin) e.origin = "Please select origin";
    if (!destination) e.destination = "Please select destination";
    if (!departureDate) e.departure = "Please select departure";
    setError(e);
    return e.origin || e.destination || e.departure ? true : false;
  }, [origin, destination, departureDate]);

  useLayoutEffect(() => {
    // skip validation until first submit
    if (!isSubmitted) {
      return;
    }
    validate();
  }, [origin, destination, departureDate, isSubmitted, validate]);

  const onSubmit = async event => {
    event.preventDefault();
    const err = validate();
    if (!isSubmitted) setIsSubmitted(true);
    if (err) {
      return;
    }

    sessionStorage.setItem(originSession, JSON.stringify(origin));
    sessionStorage.setItem(destSession, JSON.stringify(destination));
    history.push("/selection");
  };

  return (
    <Wrapper>
      <Main style={{}}>
        <Header />
        <Form autoComplete="off" onSubmit={onSubmit}>
          <fieldset>
            <InputField isError={error && error.origin}>
              <SelectStation id="origin" placeholder="Origin" stored={origin} />
              {error && error.origin && <Error message={error.origin} />}
            </InputField>
            <InputField isError={error && error.destination}>
              <SelectStation
                id="dest"
                placeholder="Destination"
                stored={destination}
              />
              {error && error.destination && (
                <Error message={error.destination} />
              )}
            </InputField>
            <InputField isError={error && error.departure}>
              <CustomDatePicker placeholder="Departure" type="departure" />
              <CalendarIco />
              {error && error.departure && <Error message={error.departure} />}
            </InputField>
            <InputField>
              <CustomDatePicker placeholder="Return" type="return" />
              <CalendarIco />
            </InputField>
            <Button type="submit">Search</Button>
          </fieldset>
        </Form>
      </Main>
    </Wrapper>
  );
};

export default Home;
