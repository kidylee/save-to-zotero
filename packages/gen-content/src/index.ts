export const worker = {
	async fetch(request: Request) {
		if(request.method === 'POST') {

		}

		return new Response(`request method: ${request.method}`);
	},
};

export default worker;
