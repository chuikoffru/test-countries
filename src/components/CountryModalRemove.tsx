import { message } from "antd";
import Modal from "antd/es/modal";
import { useState } from "react";
import { CountriesAPI } from "../api/countries.api";
import { useTypedDispatch } from "../store";
import { CountriesStore, ICountry } from "../store/countries.slice";
import { Mode } from "../types/Mode";

type CountryModalRemoveProps = {
  selectedRow: ICountry | null;
  mode: Mode | null;
  onCancel: () => void;
};

function CountryModalRemove({ selectedRow, mode, onCancel }: CountryModalRemoveProps) {
  const dispatch = useTypedDispatch();
  const isOpened = !!selectedRow && mode === "remove";
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!selectedRow) return;
    setLoading(true);
    try {
      const isRemoved = await CountriesAPI.remove(selectedRow?.id);
      if (isRemoved) {
        dispatch(CountriesStore.remove(selectedRow.id));
        message.success("Запись успешно удалена!");
        onCancel();
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Удалить запись"
      open={isOpened}
      onOk={handleConfirm}
      onCancel={onCancel}
      okButtonProps={{ loading }}
    >
      Вы уверены, что хотите удалить запись <b>{selectedRow?.name}</b>
    </Modal>
  );
}

export default CountryModalRemove;
