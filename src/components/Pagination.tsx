import { useState } from "react"

const Pagination = ({prevPage,nextPage,}) => {
	


	return (
		<div>
		<button onClick={prevPage}>prev</button>
		<button onClick={nextPage}>next</button>
		</div>
	)
}

export default Pagination
