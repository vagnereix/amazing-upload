import styles from './styles.module.scss';
import Dropzone from 'react-dropzone';
import cx from 'classnames';

interface UploadProps {
  onUpload: (files: File[]) => void;
}

export function Upload({ onUpload }: UploadProps) {
  function renderDragMessage(isDragActive: boolean, isDragReject: boolean) {
    if (!isDragActive) {
      return (
        <p
          className={styles.uploadMessage}
        >
          Insira ou arraste arquivos aqui...
        </p>
      )
    }

    if (isDragReject) {
      return (
        <p
          className={cx(
            styles.uploadMessage,
            styles.error,
          )}
        >
          Arquivo(s) não suportado(s)
        </p>
      )
    }

    return <p
      className={cx(
        styles.uploadMessage,
        styles.success,
      )}
    >
      Solte o(s) arquivo(s) aqui
    </p>;
  }

  return (
    <>
      <Dropzone accept='image/*' onDropAccepted={onUpload}>
        {
          ({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <div
              {...getRootProps()}
              className={cx(
                styles.dropzone,
                { [styles.dragActive] : isDragActive},
                { [styles.dragReject] : isDragReject},
              )}
            >
              <input {...getInputProps()} />
              {renderDragMessage(isDragActive, isDragReject)}
            </div>
          )
        }
      </Dropzone>
    </>
  )
}
