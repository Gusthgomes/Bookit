"use client";
import { IImage, IRoom } from "@/backend/models/Room";
import { revalidateTag } from "@/helpers/revalidate";
import { useUploadRoomImagesMutation } from "@/redux/api/roomApi";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  data: {
    room: IRoom;
  };
}

const UploadRoomImages = ({ data }: Props) => {
  const [images, setImages] = useState<string[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState<IImage[]>([]);

  const router = useRouter();

  const [uploadRoomImages, { error, isLoading, isSuccess }] =
    useUploadRoomImagesMutation();

  useEffect(() => {
    if (error && "data" in error) {
      toast.error(error.data.data?.errMessage);
    }

    if (isSuccess) {
      revalidateTag("RoomDetails");
      setImagesPreview([]);
      router.refresh();
      toast.success("Images uploaded successfully!");
    }
  }, [error, isSuccess]);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = Array.from(e.target.files || []);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const submitHandler = () => {
    uploadRoomImages({ id: data?.room?._id, body: { images } });
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-7 mt-5 mt-lg-0">
        <form
          className="shadow rounded bg-body"
          action="/submit-product-images"
          method="POST"
        >
          <h2 className="mb-4">Upload Product Images</h2>

          <div className="form-group">
            <label htmlFor="customFile" className="form-label">
              Choose Images
            </label>

            <div className="custom-file">
              <input
                type="file"
                name="product_images"
                className="form-control"
                id="customFile"
                multiple
                required
              />
            </div>

            <div className="new-images mt-4">
              <p className="text-warning">New Images:</p>
              <div className="row mt-4">
                <div className="col-md-3 mt-2">
                  <div className="card">
                    <img
                      src="path_to_image.jpg"
                      alt="Card"
                      className="card-img-top p-2"
                      style={{ width: "100%", height: "80px" }}
                    />
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        borderColor: "#dc3545",
                      }}
                      type="button"
                      className="btn btn-block btn-danger cross-button mt-1 py-0"
                    >
                      <i className="fa fa-times"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="uploaded-images mt-4">
              <p className="text-success">Product Uploaded Images:</p>
              <div className="row mt-1">
                <div className="col-md-3 mt-2">
                  <div className="card">
                    <img
                      src="path_to_uploaded_image.jpg"
                      alt="Card"
                      className="card-img-top p-2"
                      style={{ width: "100%", height: "80px" }}
                    />
                    <button
                      style={{
                        backgroundColor: "#dc3545",
                        borderColor: "#dc3545",
                      }}
                      className="btn btn-block btn-danger cross-button mt-1 py-0"
                      disabled
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            id="register_button"
            type="submit"
            className="btn form-btn w-100 py-2"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadRoomImages;
