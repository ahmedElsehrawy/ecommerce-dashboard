import { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  Form,
  Input,
  InputNumber,
  Upload,
  UploadProps,
  Modal,
} from "antd";
import type { UploadFile } from "antd/es/upload/interface";

import { useLazyQuery, useMutation } from "@apollo/client";
import { CATEGORIES, CREATE_PRODUCT } from "../../../apollo/queries";
import CustomCard from "../../../components/common/CustomCard";
import CustomButton from "../../../components/common/CustomButton";
import CustomSelect from "../../../components/common/CustomSelect";
import { PlusOutlined } from "@ant-design/icons";
import { uploadImage } from "../../../utils/imageUpload";
import { RcFile } from "antd/lib/upload";
import { SCREENS } from "../../../constants";
import Loader from "../../../components/common/Loader";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

type Props = {};

const AddProduct = (props: Props) => {
  const [mainImage, setMainImage] = useState<any>(null);
  const [subImages, setSubImages] = useState<any>([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadLoading, setUploadLoading] = useState<any>(false);

  const navigate = useNavigate();

  const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);

  const [getCategoriees, { data: categories }] = useLazyQuery(CATEGORIES);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const onFinish = async (values: any) => {
    setUploadLoading(true);
    let uploadedMainImage = await uploadImage(mainImage);

    let optimizedImages: any = [];

    if (subImages.length > 0) {
      await Promise.all(subImages.map((img: any) => uploadImage(img))).then(
        (results) => {
          optimizedImages = results.map((result) => ({
            url: result.secure_url,
          }));
        }
      );
    }
    createProduct({
      variables: {
        input: {
          ...values,
          price: +values.price,
          mainImage: uploadedMainImage.secure_url,
          gallery: optimizedImages,
        },
      },
      onCompleted: (data) => {
        console.log("🚀 ~ file: index.tsx ~ line 82 ~ onFinish ~ data", data);
        setUploadLoading(false);
        navigate(`/products/${data.createProduct.id}`);
      },
      onError: (error) => {
        console.log("🚀 ~ file: index.tsx:85 ~ onFinish ~ error:", error);
      },
    });
  };

  const uploadProps: UploadProps = {
    async beforeUpload(file) {
      setMainImage(file);
    },
  };

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    let optimizedfileList = newFileList.map((item) => item.originFileObj);

    setSubImages(optimizedfileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  if (uploadLoading || loading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  return (
    <Container>
      <CustomCard>
        <Form onFinish={onFinish}>
          <Title>AddProduct</Title>

          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please input your Product Name" },
            ]}
            label="Name"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please input Product Description" },
            ]}
            label="Description"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item
            name="price"
            rules={[{ required: true, message: "Please input price" }]}
            label="Price"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <InputNumber<string>
              style={{ width: 200 }}
              defaultValue="0"
              min="0"
              step="1"
              // onChange={onChange}
              stringMode
            />
          </Form.Item>
          <Form.Item
            name="categoryId"
            rules={[{ required: true, message: "Please input category" }]}
            label="Category"
            labelCol={{ xs: 24 }}
            labelAlign="left"
          >
            <CustomSelect
              values={categories?.categories?.nodes}
              placeholder="select a category"
              onChange={(values: any) => {
                console.log("change", values);
              }}
              onSearch={(search: string) => {
                if (search.trim() !== "") {
                  getCategoriees({
                    variables: {
                      skip: 0,
                      take: 10,
                      name: search,
                    },
                  });
                }
              }}
            />
          </Form.Item>
          <CardContainer>
            <CustomCard>
              <Title>Select Main Image</Title>
              <Upload {...uploadProps} maxCount={1} listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Main Image</div>
                </div>
              </Upload>
            </CustomCard>
            <CustomCard>
              <Title>Select Sub Images</Title>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={3}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
            </CustomCard>
          </CardContainer>
          <Modal
            open={previewOpen}
            title={previewTitle}
            footer={null}
            onCancel={handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
          <CustomButton
            size="large"
            loading={loading}
            type="primary"
            htmlType="submit"
          >
            Add Product
          </CustomButton>
        </Form>
      </CustomCard>
    </Container>
  );
};

export const Container = styled.div`
  .ant-input-number-in-form-item {
    width: 100% !important;
    border-radius: 4px;
    height: 36px;
  }

  .ant-input {
    border-radius: 4px;
    height: 36px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
  gap: 10px;

  @media screen and (max-width: ${SCREENS.md}) {
    flex-direction: column;
  }

  .ant-typography {
    font-size: 18px;
    margin-bottom: 24px;
  }
  .ant-card {
    padding: 10px;
  }
`;

export const LoaderContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export default AddProduct;
