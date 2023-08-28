import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Switch,
  Breadcrumb,
  Table,
  Modal,
  Upload,
  Spin,
  Tag,
  Image,
  Select,
  InputNumber,
  Checkbox,
  Cascader,
  Radio,
} from "antd";
import ImgCrop from "antd-img-crop";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import API from "./../Utils/ApiService";
const api = new API();
export const FormInput = ({
  label,
  name,
  placeholder,
  required,
  validationmsg,
  onClick,
  onChange,
  icon,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Input
        prefix={icon || ""}
        placeholder={placeholder || ""}
        onClick={onClick}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export const FormSelect = ({
  label,
  name,
  required,
  validation,
  options,
  onChange,
  loading,
  multiple,
  placeholder,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[
        {
          required: required,
          message: validation,
        },
      ]}
      className="w_100_p m_0"
    >
      <Select
        className="w_100_p"
        showSearch
        mode={multiple}
        placeholder={placeholder ? placeholder : "Search to Select"}
        optionFilterProp="children"
        onChange={onChange}
        loading={loading}
        filterOption={(input, option) => (option?.label ?? "").includes(input)}
        filterSort={(optionA, optionB) =>
          (optionA?.label ?? "")
            .toLowerCase()
            .localeCompare((optionB?.label ?? "").toLowerCase())
        }
        options={options}
      />
    </Form.Item>
  );
};

export const FormTextArea = ({
  label,
  name,
  placeholder,
  required,
  validationmsg,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Input.TextArea placeholder={placeholder || ""} />
    </Form.Item>
  );
};

export const FormNumber = ({
  label,
  name,
  placeholder,
  required,
  validationmsg,
  min,
  max,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <InputNumber
        placeholder={placeholder || ""}
        type="number"
        className="w_100_p"
        min={min || 1}
        max={max}
      />
    </Form.Item>
  );
};

export const FormCheckBox = ({
  label,
  name,
  text,
  required,
  validationmsg,
  defaultChecked,
  onclick,
  onchange,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Checkbox
        defaultChecked={defaultChecked}
        onClick={onclick}
        onChange={onchange}
      >
        {text}
      </Checkbox>
    </Form.Item>
  );
};

export const FromCheckBoxGroup = ({
  label,
  name,
  options,
  required,
  validationmsg,
  defaultChecked,
  onclick,
  onchange,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Checkbox.Group
        options={options || []}
        defaultChecked={options[defaultChecked] || [""]}
        onChange={onchange}
        onClick={onclick}
      />
    </Form.Item>
  );
};

export const FormCascader = ({
  label,
  name,
  required,
  validationmsg,
  options,
  placeholder,
  multiple,
  onchange,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Cascader
        options={options || []}
        placeholder={placeholder}
        multiple={multiple}
        onChange={onchange}
        maxTagCount="responsive"
      />
    </Form.Item>
  );
};

export const FormRadioGroup = ({
  label,
  name,
  options,
  required,
  validationmsg,
  onchange,
  onclick,
  defaultValue,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Radio.Group
        onClick={onclick}
        onChange={onchange}
        options={options || []}
        defaultValue={defaultValue}
      />
    </Form.Item>
  );
};

export const FormSwitch = ({ label, name, setValue }) => {
  return (
    <Form.Item label={label} name={name} className="w_100_p m_0">
      <Switch defaultChecked={Boolean(setValue)} />
    </Form.Item>
  );
};

export const FormInputPassword = ({
  label,
  name,
  placeholder,
  required,
  validationmsg,
  onClick,
  onChange,
  icon,
}) => {
  return (
    <Form.Item
      label={label || ""}
      name={name || ""}
      rules={[
        {
          required: required,
          message: validationmsg,
        },
      ]}
      className="w_100_p m_0"
    >
      <Input.Password
        prefix={icon || ""}
        placeholder={placeholder || ""}
        onClick={onClick}
        onChange={onChange}
      />
    </Form.Item>
  );
};

export const FormButton = ({
  type,
  btype,
  text,
  loading,
  icon,
  // onclick,
}) => {
  return (
    <Form.Item className="w_100_p m_0">
      <Button
        type={type}
        htmlType={btype}
        loading={loading}
        // onClick={onclick}
      >
        {icon || ""} {text}
      </Button>
    </Form.Item>
  );
};

export const BreadcrumbDynamic = ({ title }) => {
  const navigate = useNavigate();
  const item = [
    {
      title: "Home",
    },
    {
      title: title,
    },
  ];
  return (
    <div className="table_head">
      <p onClick={() => navigate(-1)} className="go_back">
        <ArrowLeftOutlined /> &nbsp;Back
      </p>
      <Breadcrumb items={item} />
    </div>
  );
};

export const DataTable = ({ rowSelections, columns, data, loading }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    rowSelections(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <Table
      rowSelection={rowSelection || []}
      columns={columns}
      loading={loading}
      dataSource={data || []}
      size="small"
      scroll={{
        x: 1200,
      }}
    />
  );
};

export const FormUpload = ({
  label,
  upload,
  limit,
  crop,
  imagesize,
  remove,
  setimage,
  reset,
  setReset,
  resetType,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  const desktop = imagesize || 150 / 150;
  useEffect(() => {
    setFileList([]);
    if (reset[resetType] === true) {
      setFileList([]);
      setReset({ ...reset, [resetType]: false });
    }
    if (setimage?.length > 0) {
      setFileList(setimage);
    }
  }, [reset, setimage, resetType]);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    upload(newFileList?.map((file) => file?.originFileObj));
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div>
      <label className="uplaod_label">{label ?? "Upload"}</label>
      {crop === true ? (
        <ImgCrop
          rotationSlider
          aspect={desktop}
          modalProps={{ centered: true }}
        >
          <Upload
            action={api.apiUrl}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            onRemove={remove}
          >
            {fileList.length >= limit ?? 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
      ) : (
        <Upload
          action={api.apiUrl}
          listType="picture-card"
          fileList={fileList}
          onRemove={remove}
          onPreview={handlePreview}
          onChange={handleChange}
        >
          {fileList.length >= limit ?? 1 ? null : uploadButton}
        </Upload>
      )}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export const PopupModel = ({ title, open, footer, oncancel, width, body }) => {
  return (
    <>
      <Modal
        title={title}
        open={open}
        footer={footer}
        onCancel={oncancel}
        width={width}
      >
        {body}
      </Modal>
    </>
  );
};

export const Loader = () => {
  return (
    <div className="suspense_wrap">
      <Spin tip="Loading" size="small" />
    </div>
  );
};

export const FormView = ({ label, value }) => {
  return (
    <div className="d_f f_w_w g_10">
      <b>{label + ": "}</b> <span>{value}</span>
    </div>
  );
};

export const FormTag = ({ label, color }) => {
  return <Tag color={color}> {label} </Tag>;
};

export const ImageView = ({ url, alt, size }) => {
  return <Image src={url} height={size || 35} alt={alt || "Image"} />;
};
