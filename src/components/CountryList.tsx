import Table, { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";
import { useTypedDispatch, useTypedSelector } from "../store";
import { fetchCountries, ICountry, selectCountries } from "../store/countries.slice";
import { Mode } from "../types/Mode";
import CountryListHeader from "./CountryListHeader";
import CountryModal from "./CountryModal";
import CountryModalRemove from "./CountryModalRemove";

function CountryList() {
  const dispatch = useTypedDispatch();
  const { items, loading } = useTypedSelector(selectCountries);
  const [selectedRow, setSelectedRow] = useState<ICountry | null>(null);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode | null>(null);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const dataSource = useMemo(() => {
    return items.filter((item) => item.name.includes(search));
  }, [items, search]);

  const columns: ColumnsType<ICountry> = [
    {
      title: "Страна",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Количество граждан",
      dataIndex: "citizens",
      key: "citizens",
      sorter: {
        compare: (a, b) => a.citizens - b.citizens,
      },
    },
  ];

  const onChangeMode = (value: Mode) => {
    setMode(value);

    if (value === "remove" && selectedRow) {
    }

    console.log("value", value);
    console.log("selectedRow :>> ", selectedRow);
  };

  const handleCloseModal = () => {
    setMode(null);
    setSelectedRow(null);
  };

  return (
    <>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        loading={loading === "pending"}
        rowSelection={{
          type: "radio",
          selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        }}
        caption={
          <CountryListHeader
            search={search}
            onSearch={setSearch}
            onChangeMode={onChangeMode}
            selectedRow={selectedRow}
          />
        }
        onRow={(record) => {
          return {
            onClick: () => setSelectedRow(record),
          };
        }}
      />
      <CountryModal selectedRow={selectedRow} mode={mode} onCancel={handleCloseModal} />
      <CountryModalRemove selectedRow={selectedRow} mode={mode} onCancel={handleCloseModal} />
    </>
  );
}

export default CountryList;
