import { useRef } from "react"
import FileInput from "../../../../shared/ui/FileInput"
import FileSVG from "../../../../shared/ui/SVGs/File"
import styles from "./ui/styles.module.css"

const ImageInputContainer = () => {
	const inputRef = useRef(null)

	return (
		<section className={styles["image-control"]}>
			<div className={styles["image-control__file-container"]}>
				<FileInput
					ref={inputRef}
					className={styles["file-input"]}
					fileTypeIndicator={<FileSVG />}
					inputDescription="Choose files"
					acceptedFileTypes={["image/png", "image/jpeg", "image/webp"]}
				/>
				<p className="text-secondary">Or drop them here. Max size: 10MB.</p>
			</div>
		</section>
	)
}

export default ImageInputContainer