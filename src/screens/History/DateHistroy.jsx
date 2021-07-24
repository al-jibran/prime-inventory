import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { View, FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { useDebouncedCallback } from "use-debounce/lib";
import format from "date-fns/format";
const yearMonthDate = "yyyy-MM-dd";

import {
  GET_DATES_FOR_MONTH,
  GET_TRANSACTIONS_ON_DATE,
} from "../../graphql/queries";
import HistoryItemRender from "./HistoryItemRender";
import {
  TransactionHistoryInfo,
  TransactionHistoryReveal,
} from "./TransactionHistory";
import ListEmptyComponent from "../../components/ListEmptyComponent";

const DateHistory = () => {
  const currentDate = new Date();

  const { data, refetch } = useQuery(GET_TRANSACTIONS_ON_DATE, {
    variables: {
      date: currentDate.getDate(),
      month: currentDate.getMonth() + 1,
      year: currentDate.getFullYear(),
    },
    fetchPolicy: "cache-and-network",
  });

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={data?.transactionsOnDate}
      ListHeaderComponent={<CalendarComponent dateHistoryRefetch={refetch} />}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ marginHorizontal: 15 }}>
          <HistoryItemRender
            item={item}
            id={item._id}
            AdditionalInfo={
              item.type === "PRODUCT" && <TransactionHistoryInfo item={item} />
            }
            RevealInfo={<TransactionHistoryReveal item={item} />}
          ></HistoryItemRender>
        </View>
      )}
      ListEmptyComponent={
        <ListEmptyComponent text={["No transactions to show here."]} />
      }
    />
  );
};

const CalendarComponent = ({ dateHistoryRefetch }) => {
  const [markedDates, setMarkedDates] = useState({});
  const { refetch } = useQuery(GET_DATES_FOR_MONTH, {
    variables: {
      date: format(new Date(), yearMonthDate),
    },
    notifyOnNetworkStatusChange: true,
    onCompleted: ({ transactionsDate }) => {
      setMarked(transactionsDate);
    },
  });

  const setMarked = (dates) => {
    const markedDates = dates.reduce((acc, current) => {
      acc[format(new Date(current), yearMonthDate)] = {
        marked: true,
      };
      return acc;
    }, {});

    setMarkedDates(markedDates);
  };

  return (
    <CalendarContainer
      markedDates={markedDates}
      refetch={refetch}
      dateHistoryRefetch={dateHistoryRefetch}
      loading
    />
  );
};

const CalendarContainer = ({ markedDates, refetch, dateHistoryRefetch }) => {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), yearMonthDate)
  );

  const debounced = useDebouncedCallback((date) => {
    refetch({ date });
  }, 500);

  return (
    <Calendar
      enableSwipeMonths={true}
      markedDates={{
        ...markedDates,
        [selectedDate]: { selected: true, disableTouchEvent: true },
      }}
      onMonthChange={(date) => {
        debounced(new Date(date.dateString));
      }}
      onDayPress={(date) => {
        setSelectedDate(date.dateString);
        if (!markedDates[date.dateString]) {
          return;
        }
        console.log("refetching...");
        dateHistoryRefetch({
          date: date.day,
          month: date.month,
          year: date.year,
        });
      }}
    />
  );
};

export default DateHistory;
