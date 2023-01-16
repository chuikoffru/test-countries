import Form from "antd/es/form";
import Input from "antd/es/input";
import Modal from "antd/es/modal";
import { CountriesAPI } from "../api/countries.api";
import { useTypedDispatch } from "../store";
import { CountriesStore, ICountry } from "../store/countries.slice";
import { Mode } from "../types/Mode";

type CountryModalProps = {
  selectedRow: ICountry | null;
  mode: Mode | null;
  onCancel: () => void;
};

const title: Record<string, string> = {
  add: "Добавить запись",
  edit: "Редактировать запись",
};

function CountryModal({ mode, selectedRow, onCancel }: CountryModalProps) {
  const [form] = Form.useForm();
  const dispatch = useTypedDispatch();
  const isOpened = mode === "add" || (mode === "edit" && selectedRow !== null);

  const handleFinish = async (values: any) => {
    if (mode === "add") {
      const country = await CountriesAPI.create(values);
      dispatch(CountriesStore.add({ ...values, id: country[0].id }));
      form.resetFields();
    }

    if (mode === "edit") {
      const isUpdated = await CountriesAPI.update(values);
      if (isUpdated) {
        dispatch(CountriesStore.update(values));
      }
    }

    onCancel();
  };

  return (
    <Modal
      title={mode && title[mode]}
      open={isOpened}
      onOk={() => form.submit()}
      onCancel={onCancel}
      destroyOnClose
    >
      <Form
        form={form}
        name="country"
        initialValues={selectedRow ?? undefined}
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: "Укажите название страны" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Количество жителей"
          name="citizens"
          rules={[{ required: true, message: "Укажите количество жителей" }]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CountryModal;
