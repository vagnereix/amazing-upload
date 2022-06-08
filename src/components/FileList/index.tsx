import styles from './styles.module.scss';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';
import Image from 'next/image';

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

interface FileListProps {
  files: IFile[],
}

export function FileList({ files }: FileListProps) {
  return (
    <ul className={styles.container}>
      {
        files.map(file => (
          <li key={file.id}>
            <div className={styles.fileInfo}>
              <Image objectFit='cover' className={styles.preview} width={36} height={36} src={file.preview} alt="Ask.fm/Lígia" />
              <div>
                <strong>{file.name}</strong>
                <span>
                  {file.readableSize}
                  {
                    file.uploaded && (<button onClick={() => {}}>Excluir</button>)
                  }
                </span>
              </div>
            </div>

            <div className={styles.icons}>
              {
                !file.uploaded && !file.error && (
                  <CircularProgressbar
                    styles={{
                      root: { width: 24, },
                      path: { stroke: '#7159C1' },
                    }}
                    strokeWidth={10}
                    value={file.progress}
                  />
                )
              }

              {
                file.url && (
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                  </a>
                )
              }

              {
                file.uploaded && (<MdCheckCircle size={24} color="#78E5D5" />)
              }
              {
                file.error && (<MdError size={24} color="#E57878" />)
              }
            </div>
          </li>
        ))
      }
    </ul>
  )
}
