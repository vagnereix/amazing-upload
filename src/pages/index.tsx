import type { NextPage } from 'next';
import { Upload } from '../components/Upload';
import { FileList } from '../components/FileList';
import Head from 'next/head';
import styles from '../../styles/Home.module.scss';
import { useState } from 'react';
import { uniqueId } from 'lodash';
import fileSize from 'filesize';
import { api } from '../services/api';

interface IFile {
  file: File,
  id: string,
  name: string,
  readableSize: string,
  preview: string,
  progress: number,
  uploaded: boolean,
  error: boolean,
  url?: string,
}

interface IData {
  progress?: number,
  uploaded?: boolean,
  error?: boolean,
  url?: string,
}

const Home: NextPage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<IFile[]>([]);

  function handleUpload(files: File[]) {
    const newFiles: IFile[] = files.map(file => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: undefined,
    }));

    setUploadedFiles(uploadedFiles.concat(newFiles));
    uploadedFiles.forEach(processUpload);
  }

  function updateFile(id: string, data: IData) {
    const newUploadedFiles = uploadedFiles.map(file => {
      return id === file.id ? { ...file, ...data } : file;
    })

    setUploadedFiles(newUploadedFiles);
  }

  function processUpload(file: IFile) {
    const formData = new FormData();
    formData.append('file', file.file, file.name);

    api.post('/post', formData, {
      onUploadProgress: (event) => {
        const progress = Number(Math.round((event.loaded * 100) / event.total));

        updateFile(file.id, {
          progress,
        })
      }
    }).then(({ data }) => {
      updateFile(file.id, {
        uploaded: true,
        url: data.files.file,
      })
    }).catch(() => {
      updateFile(file.id, {
        error: true,
      })
    });
  }

  return (
    <>
      <Head>
        <title>
          Upload files ₢
        </title>
      </Head>
      <main className={styles.container}>
        <div className={styles.content}>
          <Upload onUpload={handleUpload} />
          {
            // Acima de zero retorna true, zero retorna false
            !!uploadedFiles.length && (
              <FileList files={uploadedFiles} />
            )
          }
        </div>
      </main>
    </>
  )
}

export default Home
