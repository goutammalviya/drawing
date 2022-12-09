import React from "react";
// import './Checkbox.css'
const Checkbox = React.forwardRef(
	({ indeterminate, ...rest }, ref) => {
		const defaultRef = React.useRef()
		const resolvedRef = ref || defaultRef

		React.useEffect(() => {
			resolvedRef.current.indeterminate = indeterminate
		}, [resolvedRef, indeterminate])

		return (
			<>
				<div class='form-check d-flex justify-content-center'>
					<br />
					<input  className='form-check-input border border-3' type='checkbox' value='' id='flexCheckChecked' ref={resolvedRef} {...rest} />
				</div>
			</>
		)
	}
)
export default Checkbox;