import Button from "antd/es/button";
import Input from "antd/es/input";
import Space from "antd/es/space";
import { ICountry } from "../store/countries.slice";
import { Mode } from "../types/Mode";

type CountryListHeader = {
  search: string;
  onSearch: (value: any) => void;
  onChangeMode: (value: Mode) => void;
  selectedRow: ICountry | null;
};

function CountryListHeader({ search, onSearch, onChangeMode, selectedRow }: CountryListHeader) {
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <Space style={{ justifyContent: "space-between", width: "100%", marginBottom: "0.5rem" }}>
      <Input placeholder="Поиск по названию" onChange={handleChangeSearch} value={search} />
      <Space.Compact>
        <Button onClick={() => onChangeMode("add")}>Добавить</Button>
        <Button onClick={() => onChangeMode("edit")} disabled={!selectedRow}>
          Изменить
        </Button>
        <Button onClick={() => onChangeMode("remove")} disabled={!selectedRow}>
          Удалить
        </Button>
      </Space.Compact>
    </Space>
  );
}

export default CountryListHeader;
