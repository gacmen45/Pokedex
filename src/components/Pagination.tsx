import { useState } from "react"

const Pagination = ({prevPageUrl,prevPage,nextPageUrl,nextPage,page,totalPages}) => {
	
console.log(page)

	return (
		<div>
			<button onClick={prevPageUrl ? prevPage : null}>prev</button>
			<button onClick={nextPageUrl ? nextPage : null}>next</button>
			<p>
				page {page} of {totalPages}
			</p>
		</div>
	)
}

export default Pagination
