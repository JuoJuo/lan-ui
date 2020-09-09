import React, { MutableRefObject, useRef } from 'react';
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios';
import 'bulma';

export interface UploadProps {
  /**
   * 上传过程中的回调事件
   */
  onProgress?: (percentage: number, file: File, source: CancelTokenSource) => void;
  /**
   * 选择的文件发生变化,第二个参数可以获取被选择的文件数组
   */
  onChange?: (e: React.ChangeEventHandler, fileList: FileList) => void;
  /**
   * input被点击
   */
  onClick?: (e: React.MouseEventHandler) => void;
  /**
   * 上传成功的回调
   */
  onSuccess?: (file: File) => void;
  /**
   * 上传失败的回调
   */
  onError?: (file: File) => void;
  /**
   * axios 配置
   */
  config?: AxiosRequestConfig;
  /**
   * 额外的上传参数
   */
  extraParam?: Record<string, any>;
}

function prepareParam (file, extraParam) {
  const formData = new FormData();
  formData.append(file.name, file);
  Object.keys(extraParam).forEach((key) => {
    formData.append(key, extraParam[extraParam]);
  });

  return formData;
}

export const Upload: React.FC<UploadProps> = (props) => {
  const { onProgress, onChange, onClick, config, extraParam = Object.create(null), onSuccess, onError } = props;
  const fileInput: MutableRefObject<HTMLInputElement> = useRef<HTMLInputElement>();

  const _handleChange = (e) => {
    onChange(e, fileInput.current.files);
    startUpload(fileInput.current.files[0]);
  };

  const _handleClick = (e) => {
    onClick(e);
  };

  function startUpload(file) {
    const source = axios.CancelToken.source();
    const formData = prepareParam (file, extraParam);

    const defaultAxiosConfig: Partial<AxiosRequestConfig> = {
      method: "post",
      url: "http://localhost:51111/user/uploadAvatar/",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      cancelToken: source.token,
      onUploadProgress: (e) => {
        const percentage = Math.round((e.loaded * 100) / e.total) || 0;
        if (onProgress) {
          onProgress(percentage, file, source);
        }
      },
    };

    axios({ ...defaultAxiosConfig, ...config })
      .then(() => {
        onProgress && onProgress(100, file, source);
        onSuccess && onSuccess(file);
      })
      .catch((e) => {
        onError && onError(file);
      });
  }

  return (
    <>
      <div className="file has-name is-boxed">
        <label className="file-label">
          <input className="file-input"
                 type="file"
                 name="resume"
                 onChange={_handleChange}
                 onClick={_handleClick}
                 ref={fileInput}
          />
          <span className="file-cta">
            {/*TODO Support ICON*/}
            <span className="file-label">
              Choose a file
            </span>
          </span>
        </label>
      </div>
    </>
  );
};
