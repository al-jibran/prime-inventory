import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { View, FlatList, ToastAndroid } from "react-native";
import { useLazyQuery, useQuery } from "@apollo/client";
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
  const [getHistory, { data, loading, error }] = useLazyQuery(
    GET_TRANSACTIONS_ON_DATE
  );

  return (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      data={data?.transactionsOnDate}
      ListHeaderComponent={
        <CalendarComponent getHistory={getHistory} loadingData={loading} />
      }
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

const CalendarComponent = ({ getHistory, loadingData }) => {
  const [markedDates, setMarkedDates] = useState({});
  const { loading, refetch } = useQuery(GET_DATES_FOR_MONTH, {
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
      getHistory={getHistory}
      loading
    />
  );
};

const CalendarContainer = ({ markedDates, refetch, getHistory, loading }) => {
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
        getHistory({
          variables: { date: date.day, month: date.month, year: date.year },
        });
      }}
    />
  );
};

export default DateHistory;
