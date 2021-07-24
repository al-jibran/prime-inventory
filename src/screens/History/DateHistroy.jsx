import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { useLazyQuery, useQuery } from "@apollo/client";

import { GET_DATES_FOR_MONTH } from "../../graphql/queries";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce/lib";
import { range } from "lodash";

const DateHistory = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString("en-CA")
  );
  const [markedDates, setMarkedDates] = useState({});
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const { data, loading, error, refetch } = useQuery(GET_DATES_FOR_MONTH, {
    variables: {
      month: currentMonth,
      year: currentYear,
    },
  });

  const debounced = useDebouncedCallback((date) => {
    refetch({ month: date.month, year: date.year });
  }, 500);

  const dates = data ? data.transactionsDate : [];

  useEffect(() => {
    const markedDates = dates.reduce((acc, current) => {
      acc[new Date(current).toLocaleDateString("en-CA")] = {
        marked: true,
      };
      return acc;
    }, {});
    setMarkedDates(markedDates);
  }, [data?.transactionsDate]);

  return (
    <Calendar
      enableSwipeMonths={true}
      markedDates={{
        ...markedDates,
        [selectedDate]: { selected: true, disableTouchEvent: true },
      }}
      onMonthChange={(date) => {
        debounced(date);
      }}
      onDayPress={(date) => {
        setSelectedDate(date.dateString);
      }}
    />
  );
};

export default DateHistory;
