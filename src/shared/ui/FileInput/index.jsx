import React, { forwardRef } from "react"
import styles from "./ui/styles.module.css"

const FileInput = forwardRef(
	(
		{
			fileTypeIndicator = React.Fragment,
			inputDescription = "",
			acceptedFileTypes = [],
			className,
			...attributes
		},
		ref
	) => {
		return (
			<label
				className={`${styles["custom-file-input"]}${
					className ? " " + className : ""
				}`}
			>
				<input
					ref={ref}
					type="file"
					name="image-input"
					accept={acceptedFileTypes.join(", ")}
					{...attributes}
				></input>
				{fileTypeIndicator}
				{inputDescription}
			</label>
		)
	}
)

export default FileInput
